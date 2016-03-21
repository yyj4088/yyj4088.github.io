var imgArray = ["s1/title.png", "s1/pic1.png", "s1/pic2.png", "s1/pic3.png", "menubtn.png", "UD.png", "menu.jpg", "preload/bg.jpg", "s2/title.png", "s2/line.png", "s2/pic1.png", "s3/title.png", "s3/pic1.jpg", "s3/w1.png", "s3/w2.png", "s3/w3.png", "s3/w4.png",
        "s4/title.png", "s4/ball.png", "s4/logo1.png", "s4/logo2.png", "s4/logo3.png", "s4/logo4.png", "s4/logo5.png", "s4/logo6.png", "s4/logo7.png", "s4/logo8.png", "s4/logo9.png", "s4/logo10.png", "s4/logo11.png", "s4/pic1.png", "s4/slider.png", "s4/ud.png", "s4/wave.png", "brand/p1-bg.jpg", "brand/p1-img1.png", "brand/p1-img2.png", "brand/p1-img3.png", "brand/p1-title.png", "brand/p1-txt1.png", "brand/p1-txt2.png", "brand/p1-txt3.png", "brand/p2-bg.jpg", "brand/p2-icon1.png", "brand/p2-icon2.png", "brand/p2-icon3.png", "brand/p2-icon4.png", "brand/p2-title.png", "brand/p3-icon1.png", "brand/p3-icon2.png", "brand/p3-icon3.png", "brand/p3-icon4.png", "brand/p3-title.png", "brand/p4-bg.jpg", "brand/p4-img1.png", "brand/p4-img2.png", "brand/p4-img3.png", "brand/p4-img4.png", "brand/p4-title.png", "brand/p4-txt1.png", "brand/p4-txt2.png"
    ],
    $allimg = $("body").find("img[data-src]");

function Loader() {
    this.currProgress = 0;
    this.isCompleted = false;
    this.total = 100;
    var loaded = 1;
    var number = document.getElementById('number');
    var lc = document.getElementById('loadingcover');
    this.Loading = function(imgArray, success) {
        var self = this;
        for (var i = 1, len = imgArray.length; i < len; i++) {
            var ext = imgArray[i].substring(imgArray[i].lastIndexOf('.')).toLowerCase();
            if (ext == '.png' || ext == '.jpg' || ext == '.jpeg' || ext == '.gif') {
                var img = new Image();
                img.onload = function() {
                    self.currProgress = parseInt(++loaded / imgArray.length * 100)
                    number.innerHTML = self.currProgress + "%";
                    //lc.style.height=100-self.currProgress+"%";
                    if (loaded == imgArray.length) {
                        success();
                    }
                };
                img.onerror = function() {
                    self.currProgress = parseInt(++loaded / imgArray.length * 100);
                    number.innerHTML = self.currProgress + "%";
                    //lc.style.height=100-self.currProgress+"%";


                    if (loaded == imgArray.length) {
                        success();
                    }
                };
                img.src = "images/" + imgArray[i];
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
        window.clearInterval(loadingt);
        $('.loading').remove();
        $allimg.each(function(idx, item) {
            if (!$(this).attr("src")) {
                $(this).attr("src", $(this).data("src"));
            }
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
        img.src = "images/" + imgArray[0];
    };
};



function autoPlayMusic() {
    if (navigator.userAgent.toLowerCase().indexOf("safari") > -1) {
        var music = $("#musichide audio").get(0);
        music.play();
    };
}
$(function() {
    var i = 1;
    loadingt = window.setInterval(function() {
        $(".load" + i).addClass('active');
        $(".load" + i).siblings('img').removeClass('active');
        if (i == 3) {
            i = 1;
        } else {
            i++;
        }
    }, 500)
    var loader = new Loader();
    loader.loadLoading(imgArray, loader);

    // if (is_weixin()) {
    //     $(".pannel6 .sharebtn").css({"background":"url(images/sharebtnwx.png) no-repeat center","background-size":"100% 100%","width":"3.4rem","height":"0.54rem","margin-left":"-1.7rem"});
    // };
    /*$(document).one('touchstart', function (e) {
        autoPlayMusic();
    })*/
})