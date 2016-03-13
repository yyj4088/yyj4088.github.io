/*
=================================
img-touch-canvas - v0.1
http://github.com/rombdn/img-touch-canvas

(c) 2013 Romain BEAUDON
This code may be freely distributed under the MIT License
=================================
*/


(function() {
    var root = this; //global object

    var ImgTouchCanvas = function(options) {
        if( !options || !options.canvas || !options.path) {
            throw 'ImgZoom constructor: missing arguments canvas or path';
        }
      
        this.canvas         = options.canvas;
        this.desktop = options.desktop || false; //non touch events
        if(this.desktop){
            this.canvas.width   = this.canvas.clientWidth;
            this.canvas.height  = this.canvas.clientHeight;
        }else{
            this.canvas.width   = this.canvas.clientWidth*2;
            this.canvas.height  = this.canvas.clientHeight*2;
        }
        
        this.context        = this.canvas.getContext('2d');
        
        
        this.position = {
            x: 0,
            y: 0
        };
        this.scale = {
            x: 0.5,
            y: 0.5
        };
        this.imgTexture = new Image();
        this.imgTexture.src = options.path;

        this.lastZoomScale = null;
        this.lastX = null;
        this.lastY = null;

        this.mdown = false; //desktop drag

        this.frame = {}
        this.frame.bolder = 0;
        this.frame.gap = 0;
        this.frame.width =  this.canvas.width - this.frame.gap * 2;
        this.frame.height = this.frame.width;
        this.frame.left = this.frame.gap;
        this.frame.top = (this.canvas.height - this.frame.height) / 2;

        this.init = false;
        this.checkRequestAnimationFrame();
        this.reqId = requestAnimationFrame(this.animate.bind(this));

        this.setEventListeners();
    };


    ImgTouchCanvas.prototype = {
        animate: function() {
            //set scale such as image cover all the canvas
            if(!this.init) {
                if(this.imgTexture.width) {
                    var scaleRatio = null;
                    if(this.imgTexture.width < this.imgTexture.height) {
                        scaleRatio = this.frame.width / this.imgTexture.width;
                    }
                    else {
                        scaleRatio = this.frame.height / this.imgTexture.height;
                    }

                    // this.scale.x = scaleRatio*1.5;
                    // this.scale.y = scaleRatio*1.5;
                    this.scale.x = scaleRatio*1;
                    this.scale.y = scaleRatio*1;

                    //Init position and size
                    this.position.x = (this.canvas.width - this.scale.x * this.imgTexture.width) / 2;
                    this.position.y = (this.canvas.height - this.scale.y * this.imgTexture.height) / 2;
                    this.init = true;
                }
            }

            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.context.drawImage(
                this.imgTexture, 
                this.position.x, this.position.y, 
                this.scale.x * this.imgTexture.width, 
                this.scale.y * this.imgTexture.height);

            this.drawFrame();

            this.reqId = requestAnimationFrame(this.animate.bind(this));
        },

        drawFrame: function(){
            this.context.beginPath();
            //this.context.lineWidth= this.frame.border;
            //this.context.strokeStyle="white";
            //this.context.rect(this.frame.left,this.frame.top,this.frame.width,this.frame.height);
            //this.context.stroke();

            //this.context.fillStyle = "rgba(0, 0, 0, 0.5)";
            //this.context.fillRect(0, 0, this.canvas.width, this.frame.top);
            //this.context.fillRect(0, this.frame.top, this.frame.gap, this.frame.height);
            //this.context.fillRect(this.frame.left + this.frame.width, this.frame.top, this.frame.gap, this.frame.height);
            //this.context.fillRect(0, this.frame.top + this.frame.height,this.canvas.width, this.frame.top);
        },

        exportFrameArea: function(){
            // Retrieve the area of canvas drawn on.
            var imageData = this.context.getImageData(this.frame.left, this.frame.top, this.frame.width, this.frame.height);

            // Create a new canvas and put the retrieve image data on it
            var newCanvas = document.createElement("canvas");
            newCanvas.width = this.frame.width;
            newCanvas.height = this.frame.height;

            newCanvas.getContext("2d").putImageData(imageData, 0, 0);

            // Now call save to file with your new canvas
            var dURL = newCanvas.toDataURL("image/jpeg");

            return dURL;
        },

        reset: function(){
            cancelAnimationFrame(this.reqId);
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },

        gesturePinchZoom: function(event) {
            var zoom = false;

            if( event.targetTouches.length >= 2 ) {
                var p1 = event.targetTouches[0];
                var p2 = event.targetTouches[1];
                var zoomScale = Math.sqrt(Math.pow(p2.pageX - p1.pageX, 2) + Math.pow(p2.pageY - p1.pageY, 2)); //euclidian distance

                if( this.lastZoomScale ) {
                    zoom = zoomScale - this.lastZoomScale;
                }

                this.lastZoomScale = zoomScale;
            }    

            return zoom;
        },

        doZoom: function(zoom) {
            if(!zoom) return;

            //new scale
            var currentScale = this.scale.x;
            var newScale = this.scale.x + zoom/100;
            

            //some helpers
            var deltaScale = newScale - currentScale;
            var currentWidth    = (this.imgTexture.width * this.scale.x);
            var currentHeight   = (this.imgTexture.height * this.scale.y);
            var deltaWidth  = this.imgTexture.width*deltaScale;
            var deltaHeight = this.imgTexture.height*deltaScale;


            //by default scale doesnt change position and only add/remove pixel to right and bottom
            //so we must move the image to the left to keep the image centered
            //ex: coefX and coefY = 0.5 when image is centered <=> move image to the left 0.5x pixels added to the right
            var canvasmiddleX = this.canvas.clientWidth / 2;
            var canvasmiddleY = this.canvas.clientHeight / 2;
            var xonmap = (-this.position.x) + canvasmiddleX;
            var yonmap = (-this.position.y) + canvasmiddleY;
            var coefX = -xonmap / (currentWidth);
            var coefY = -yonmap / (currentHeight);
            var newPosX = this.position.x + deltaWidth*coefX;
            var newPosY = this.position.y + deltaHeight*coefY;

            //edges cases
            var newWidth = currentWidth + deltaWidth;
            var newHeight = currentHeight + deltaHeight;
            
            if( newWidth < this.frame.width )
                return;
            if( newPosX > this.frame.left ) {
                newPosX = this.frame.left;
            }
            if( newPosX + newWidth < this.frame.width + this.frame.left ) {
                newPosX = this.frame.width + this.frame.left - newWidth;
            }
            
            if( newHeight < this.frame.height )
                return;
            if( newPosY > this.frame.top ) {
                newPosY = this.frame.top;
            }
            if( newPosY + newHeight < this.frame.height + this.frame.top ) {
                newPosY = this.frame.height + this.frame.top - newHeight;
            }

            //finally affectations
            this.scale.x    = newScale;
            this.scale.y    = newScale;
            this.position.x = newPosX;
            this.position.y = newPosY;
        },

        doMove: function(relativeX, relativeY) {
            if(this.lastX && this.lastY) {
              var deltaX = relativeX - this.lastX;
              var deltaY = relativeY - this.lastY;
              var currentWidth = (this.imgTexture.width * this.scale.x);
              var currentHeight = (this.imgTexture.height * this.scale.y);

              this.position.x += deltaX;
              this.position.y += deltaY;


              //edge cases
              if( this.position.x > this.frame.left ) {
                this.position.x = this.frame.left;
              }
              else if( this.position.x + currentWidth < this.frame.width + this.frame.left ) {
                this.position.x = this.frame.width + this.frame.left - currentWidth;
              }
              if( this.position.y > this.frame.top ) {
                this.position.y = this.frame.top;
              }
              else if( this.position.y + currentHeight < this.frame.height + this.frame.top ) {
                this.position.y = this.frame.height + this.frame.top - currentHeight;
              }
            }

            this.lastX = relativeX;
            this.lastY = relativeY;
        },

        setEventListeners: function() {
            // touch
            this.canvas.addEventListener('touchstart', function(e) {
                this.lastX          = null;
                this.lastY          = null;
                this.lastZoomScale  = null;
            }.bind(this));

            this.canvas.addEventListener('touchmove', function(e) {
                e.preventDefault();
                
                if(e.targetTouches.length == 2) { //pinch
                    this.doZoom(this.gesturePinchZoom(e));
                }
                else if(e.targetTouches.length == 1) {
                    var relativeX = e.targetTouches[0].pageX - this.canvas.getBoundingClientRect().left;
                    var relativeY = e.targetTouches[0].pageY - this.canvas.getBoundingClientRect().top;                
                    this.doMove(relativeX, relativeY);
                }
            }.bind(this));

            if(this.desktop) {
                // keyboard+mouse
                window.addEventListener('keyup', function(e) {
                    console.log(e.keyCode);
                    if(e.keyCode == 187 || e.keyCode == 61) { //+
                        this.doZoom(5);
                    }
                    else if(e.keyCode == 173) {//-
                        this.doZoom(-5);
                    }
                }.bind(this));

                window.addEventListener('mousedown', function(e) {
                    this.mdown = true;
                    this.lastX = null;
                    this.lastY = null;
                }.bind(this));

                window.addEventListener('mouseup', function(e) {
                    this.mdown = false;
                }.bind(this));

                window.addEventListener('mousemove', function(e) {
                    var relativeX = e.pageX - this.canvas.getBoundingClientRect().left;
                    var relativeY = e.pageY - this.canvas.getBoundingClientRect().top;

                    if(e.target == this.canvas && this.mdown) {
                        this.doMove(relativeX, relativeY);
                    }

                    if(relativeX <= 0 || relativeX >= this.canvas.clientWidth || relativeY <= 0 || relativeY >= this.canvas.clientHeight) {
                        this.mdown = false;
                    }
                }.bind(this));
            }
        },

        checkRequestAnimationFrame: function() {
            var lastTime = 0;
            var vendors = ['ms', 'moz', 'webkit', 'o'];
            for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
                window.cancelAnimationFrame = 
                  window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
            }

            if (!window.requestAnimationFrame) {
                window.requestAnimationFrame = function(callback, element) {
                    var currTime = new Date().getTime();
                    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                    var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
                      timeToCall);
                    lastTime = currTime + timeToCall;
                    return id;
                };
            }

            if (!window.cancelAnimationFrame) {
                window.cancelAnimationFrame = function(id) {
                    clearTimeout(id);
                };
            }
        }
    };

    root.ImgTouchCanvas = ImgTouchCanvas;
}).call(this);