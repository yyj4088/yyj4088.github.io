var imgArray = ["s1/pic1.png","s1/pic2.png","s1/pic3.png"],
    $allimg=$("body").find("img[data-src]");

function Loader() {
    this.currProgress = 0;
    this.isCompleted = false;
    this.total = 100;
    var loaded = 1;
    var number = document.getElementById('number');
    var lc = document.getElementById('loadingcover');
    this.Loading = function(imgArray, success) {
        var self = this;
        for (var i = 1,len=imgArray.length; i < len; i++) {
            var ext = imgArray[i].substring(imgArray[i].lastIndexOf('.')).toLowerCase();
            if (ext == '.png' || ext == '.jpg' || ext == '.jpeg' || ext == '.gif') {
                var img = new Image();
                img.onload = function() {
                    self.currProgress = parseInt(++loaded / imgArray.length * 100)
                    number.innerHTML=self.currProgress+"%";
                    //lc.style.height=100-self.currProgress+"%";
                    if (loaded == imgArray.length) {
                        success(); 
                    }
                };
                img.onerror = function() {
                    self.currProgress = parseInt(++loaded / imgArray.length * 100);
                    number.innerHTML=self.currProgress+"%";
                    //lc.style.height=100-self.currProgress+"%";


                    if (loaded == imgArray.length) {
                        success(); 
                    }
                };
                img.src ="img/" + imgArray[i];
            } else {
                this.loadMusic(imgArray[i]);
            }
        }
    };
    this.loadMusic = function(path) {
        $.ajax({
            type: 'get',
            url: path,
            data: {},
            async: false, 
            success: function(data) {
                loaded++;
                console.log(this);
                if (loaded == imgArray.length) {
                    success(); 
                }
            },
            error: function(xhr, type) {
                loaded++;
                console.log(this);
                if (loaded == imgArray.length) {
                    success();
                }
            }
        })
    };
    this.success = function() {
        
        $('.loading').remove();
        /*$allimg.each(function(idx,item){
            if(!$(this).attr("src")){
                $(this).attr("src",$(this).data("src"));
            }
        })*/
        $('#main').fullpage({
                //sectionsColor: ['#fff', '#fff', '#fff', '#fff']
            });

        /*changePannel($(".pannel1"),function(){
         		showTxt(goon,2000);
         })*/

// goon();
    };
    this.loadLoading = function(imgArray, obj) {
        var img = new Image();
        img.onload = function() {
            obj.Loading(imgArray, obj.success);
        };
        img.onerror = function() {
            obj.Loading(imgArray, obj.success);
        };
        img.src = "img/"+imgArray[0];
    };
};



function autoPlayMusic(){
    if (navigator.userAgent.toLowerCase().indexOf("safari")>-1) {
         var music=$("#musichide audio").get(0);
            music.play();
    };
}
$(function(){
    var loader = new Loader();
    loader.loadLoading(imgArray, loader);
    // if (is_weixin()) {
    //     $(".pannel6 .sharebtn").css({"background":"url(img/sharebtnwx.png) no-repeat center","background-size":"100% 100%","width":"3.4rem","height":"0.54rem","margin-left":"-1.7rem"});
    // };
    $(document).one('touchstart', function (e) {
        autoPlayMusic();
    })
})


