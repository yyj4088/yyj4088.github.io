var imgArray = ["snowbg.png","a.png","b.png","c.png",
                "d.png","e.png","bg1.jpg","logo.png","music.png"
                ,"1.jpg","2.jpg","3.jpg","bg.jpg","bar.jpg","changemodel.png","choosetxt.png",
                "cut.png","done.png","done2.png","edit.png","giftbg.png",
                "giftbox.png","giftbtn.png","giftpic.png","gifttxt.png","goon.png",
                "line.png","mail.png","light.png",
                "mypic.png","next.png","pen.png","penandmail.png","popbg.png",
                "poplight.png","scroll.png","sharepen.png","skip.png",
                "snowl.png","txt.png","sharebtn.png","slogan.png","slogan1.png",
                "cxj.jpg","szs.jpg","qcz.jpg","tgk.jpg","wan.jpg",
                "xxn.jpg","zye.jpg","yxf.jpg","zqc.jpg","ynw.jpg",
                "cxjtxt.png","szstxt.png","qcztxt.png","tgktxt.png","wantxt.png",
                "xxntxt.png","zyetxt.png","yxftxt.png","zqctxt.png","ynwtxt.png",
                "wxxtxt.png","hjhtxt.png","qyntxt.png","thxtxt.png","xzwtxt.png",
                "hb/cxjhb.jpg","hb/szshb.jpg","hb/qczhb.jpg","hb/tgkhb.jpg","hb/wanhb.jpg",
                "hb/xxnhb.jpg","hb/zyehb.jpg","hb/yxfhb.jpg","hb/zqchb.jpg","hb/ynwhb.jpg",
                "hb/wxxhb.jpg","hb/hjhhb.jpg","hb/qynhb.jpg","hb/thxhb.jpg","hb/xzwhb.jpg",
                "hb/cxjv.png","hb/szsv.png","hb/qczv.png","hb/tgkv.png","hb/wanv.png",
                "hb/xxnv.png","hb/zyev.png","hb/yxfv.png","hb/zqcv.png","hb/ynwv.png",
                "hb/wxxv.png","hb/hjhv.png","hb/qynv.png","hb/thxv.png","hb/xzwv.png",
                "hb/cxjh.png","hb/szsh.png","hb/qczh.png","hb/tgkh.png","hb/wanh.png",
                "hb/xxnh.png","hb/zyeh.png","hb/yxfh.png","hb/zqch.png","hb/ynwh.png",
                "hb/wxxh.png","hb/hjhh.png","hb/qynh.png","hb/thxh.png","hb/xzwh.png",
                // "txt/cxj.png","txt/szs.png","txt/qcz.png","txt/tgk.png","txt/wan.png",
                // "txt/xxn.png","txt/zye.png","txt/yxf.png","txt/zqc.png","txt/ynw.png",
                "flash/01.jpg","flash/02.jpg","flash/03.jpg","flash/04.jpg","flash/05.jpg",
                "flash/06.jpg","flash/07.jpg","flash/08.jpg","flash/09.jpg","uploading.png",
                "sharebtnwx.png","wdbg.jpg","giftbtn2.png","p7gift.png","p7btn.png","p7txt.png",
                "m-1.png","m-2.png","m-3.png","m-4.png"
                ],
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
                    number.innerHTML=self.currProgress;
                    lc.style.height=100-self.currProgress+"%";
                    if (loaded == imgArray.length) {
                        success(); 
                    }
                };
                img.onerror = function() {
                    self.currProgress = parseInt(++loaded / imgArray.length * 100);
                    number.innerHTML=self.currProgress;
                    lc.style.height=100-self.currProgress+"%";


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
        $allimg.each(function(idx,item){
            if(!$(this).attr("src")){
                $(this).attr("src",$(this).data("src"));
            }
        })
        $('.wrapper').show();
        changePannel($(".pannel1"),function(){
         		showTxt(goon,2000);
         })

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


