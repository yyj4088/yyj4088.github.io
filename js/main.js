var chooseDetail = {
        "qyn": ["情意浓", "你只是笑了一下，却让寒冷空气里溢满了浓清暖意。", "qyn"],
        "wxx": ["万象新", "给家人的新年祝福，不需要多有新意，只要有满满的心意。", "wxx"],
        "hjh": ["合家欢", "家里的年味从来没变，欢聚的这一刻，你们始终都是最重要的那一味。", "hjh"],
        "thx": ["同欢享", "分享这一年的欢甜旧事，也一起迎接新的缤纷 有你们，年才是新的", "thx"],
        "xzw": ["新展望", "只要和你们一起，新年的每一天都精彩可期", "xzw"],
        "cxj": ["常相聚", "你们，陪我看遍人生的每一道风景，其实，和你们常相聚，我就看到了人生的风景", "cxj"],
        "zye": ["知遇恩", "当初因为你顶着，才有我后来的一片天，谢谢初见的是你", "zye"],
        "xxn": ["谢谢你", "谢谢你们，在我成长的路上一直在，以后你们人生的每一步我会陪伴到底", "xxn"],
        "tgk": ["同甘苦", "在夜夜夜的加班里，我最得意的收获，不是生意…而是情义", "tgk"],
        "ynw": ["忆难忘", "那时最不听您的话，但现在我最常记忆的，都是您说过的话", "ynw"],
        "yxf": ["要幸福", "我等到了我的幸福，你的幸福也已经在路上", "yxf"],
        "wan": ["我爱你", "觉得和你在一起的那一下子我想到的是一辈子", "wan"],
        "szs": ["誓终生", "因为有你一起，慢慢变老成了我最期待的事", "szs"],
        "qcz": ["情长在", "那些照片虽然已发黄，但我们一起调和的青春颜色却常驻在我心里", "qcz"],
        "zqc": ["致青春", "你们是我青春盛宴里，不可或缺一道又一道，活色生香的主菜", "zqc"],
        "zdy": [null]
    },
    val = "qcz",
    clickzdy = false,
    movex,
    movey,
    p1timer,
    p2timer,
    p3timer,
    dataURL,
    uploadsrc,
    base = WebUploader.Base;
var uploader = WebUploader.create({
    pick: {
        id: '#filePicker',
        multiple: false
    },

    // 设置用什么方式去生成缩略图。
    thumb: {
        quality: 100,

        // 不允许放大
        allowMagnify: true,

        // 是否采用裁剪模式。如果采用这样可以避免空白内容。
        crop: false
    },

    // 禁掉分块传输，默认是开起的。
    chunked: false,

    // 禁掉上传前压缩功能，因为会手动裁剪。
    compress: false,

    // fileSingleSizeLimit: 2 * 1024 * 1024,

    server: 'js/webupload/server/fileupload.php',
    swf: 'js/webupload/Uploader.swf',
    onError: function() {
        var args = [].slice.call(arguments, 0);
        alert(args.join('\n'));
    }
});
$(document).ready(function() {
    var hash = location.hash;
    if (hash == '#zqdz') {
        p3open();
    } else if (hash == '#gshb') {
        $(".page7").show();
        $(".navi").show();
    } else {
        p1open();
    };
    appendSnow();
    if (base.browser.ie !== 9) {
        $(".upload").attr('id', 'upload');
        $(".page3 .pass").click(function(event) {
            uploader.destroy();
        });
    };
});

function appendSnow() {
    var snowObj = "";
    for (var i = 1; i < 12; i++) {
        snowObj += "<img class=\"snow snow" + i + "\" src=\"img/snowl.png\">"
    };
    $(".snowcontainer").append(snowObj);
}
var rotation2 = function() {
    $(".music").rotate({
        duration: 8000,
        angle: 0,
        animateTo: 360,
        callback: rotation2,
        easing: function(x, t, b, c, d) { // t: current time, b: begInnIng value, c: change In value, d: duration
            return c * (t / d) + b;
        }
    });
}
rotation2();
var rotation1 = function() {
    $(".music").rotate({
        duration: 8000,
        angle: 0,
        callback: rotation1
    });
}

$(".snow").delay(1000).fadeIn('slow');
$(".music").on("click", function(e) {
    var audiosrc = $("#music").get(0);
    if (audiosrc.paused) {
        audiosrc.play();
        rotation2();
    } else {
        audiosrc.pause();
        rotation1();
    };

})

$(document).one('touchstart', function(e) {
    if (navigator.userAgent.toLowerCase().indexOf("safari") > -1) {
        $("#music").get(0).play();
    };
})

function p1open() {
    $(".page1").show();
    $(".wd span").fadeIn(1000, function() {
        $(".wd img").fadeIn(1000);
    });
    p1timer = window.setTimeout(p2open, 3000);
}

function p2open() {
    $(".page1").hide();
    $(".page2").show();
    $(".page2").css('height', document.body.clientWidth / 1920 * 975);
    $(".slide1").fadeIn(500, function() {
        $(".slide1 .word").fadeIn(1500);
    });
    $(".slide2").delay(3000).fadeIn(500, function() {
        $(".slide2 .word").fadeIn(1500);
    });
    $(".slide3").delay(6000).fadeIn(500, function() {
        $(".slide3 .word").fadeIn(1500);
    });
    p2timer = window.setTimeout(p3open, 10000);
}

function p3open() {
    $(".page2").hide();
    $(".page3").fadeIn();
    $(".navi").show();
    var i = 1;
    imgloop(i);
    titleloop(i);
    p3timer = window.setInterval(function() {
        if (i < 3) {
            i++;
        } else {
            i = 1;
        };
        imgloop(i);
        titleloop(i);
    }, 7000)

    function imgloop(i) {
        $(".page3 .p" + i).fadeIn(7000, function() {
            $(this).fadeOut();
        });
    }

    function titleloop(i) {
        $(".page3 .t" + i).delay(3500).fadeIn(3500, function() {
            $(this).fadeOut();
        });
    }
}

$(".page1 .pass").click(function(event) {
    window.clearTimeout(p1timer);
    p2open();
});
$(".page2 .pass").click(function(event) {
    window.clearTimeout(p2timer);
    p3open();
});
$(".page3 .pass,.mail").click(function(event) {
    window.clearTimeout(p3timer);
    $(".page3").hide();
    $(".page4").show();
});


$(".page4 .disc input").click(function(event) {
    val = $(".page4 input:checked").val();
    $(".page4 li,.zdy").removeClass('selected');
    $(this).parent().addClass('selected');
    if (val !== 'zdy') {
        $(".photo img")[0].src = "img/page4/img" + val + ".jpg";
    };
});
$(".dots a").click(function(event) {
    if ($(this).hasClass('off')) {
        $(this).removeClass('off').addClass('on');
        $(this).siblings('a').removeClass('on').addClass('off');
        var index = $(this).index() + 1;
        $(".disc").find('.u' + index).show().siblings('ul').hide();
    };
});
$(".page4 .zdy").click(function(event) {
    $(".page5 .left img")[0].src = "img/page5/imgqcz.jpg";
    $(".page5 input[value='qcz']").attr('checked', 'checked');
    $(".page5 input[value='qcz']").next('img').addClass('selected');
    $(".page5 .title").empty().text('自定义');
    $(".page5 .txt span").text('点击编辑，输入您的祝福语');
    $(".page4").hide();
    $(".page5").show();
    clickzdy = true;
    $(".page5 .left img").load(drag);
});
$(".page4 .next").click(function(event) {
    $(".page5 .left img")[0].src = "img/page5/img" + val + ".jpg";
    $(".page5 input").each(function(index, el) {
        var thisval = $(this).val();
        if (thisval == val) {
            $(this).attr('checked', 'checked');
            $(this).next('img').addClass('selected');
            $(this).parents('table').show().siblings('table').hide();
        };
    });
    $(".page5 .title img")[0].src = "img/page5/title" + val + ".png";
    $(".page5 .con img")[0].src = "img/page5/con" + val + ".png";
    $(".page4").hide();
    $(".page5").show();
    $(".page5 .left img").load(drag);
    window.setTimeout(function() {
        $(".move").css({
            "left": (581 - $(".move").width()) / 2,
            "top": '170px'
        })
    }, 50)

});
$(".page5 table input").click(function(event) {
    _smq.push(['custom', 'Page-2', '选择照片']);
    val = $(this).val();
    $(".page5 .left img")[0].src = "img/page5/img" + val + ".jpg";
    $(".page5 table img").removeClass('selected');
    $(this).next('img').addClass('selected');
});
$(".page5 .next").click(function(event) {
    $(".page5 table").hide();
    $(this).parents('table').next('table').show();
});
$(".page5 .prev").click(function(event) {
    $(".page5 table").hide();
    $(this).parents('table').prev('table').show();
});

$(".page5 .finish").click(function() {
    var content = $(".contentarea").val();
    var title = $(".titlearea").val();
    if (title.replace(/\s+/g, "").length == 3) {
        if (title !== chooseDetail[val][0]) {
            $(".move .title").empty().append(title);
        } else {
            $(".move .title").empty().append('<img src="img/page5/title' + val + '.png">')
        };
        if (content !== chooseDetail[val][1]) {
            $(".move .con").hide();
            $(".move .txt").text(content).show();
        } else {
            $(".move .con").show();
            $(".move .txt").empty().hide();
            var left = (581 - $(".page5 .con img").width()) / 2;
            $(".move").css({
                "left": left,
                "top": '170px'
            });
        };
        $(".inputarea").hide();
    } else {
        alert("标题内容必须输入三个字");
    };
});
$(".page5 .editbtn").click(function(event) {
    var txt = $(".move .txt").text();
    if ($(".move .title img").length > 0) {
        var titlesrc = $('.title img')[0].src;
        var filename = getFileName(titlesrc);
        if (filename) {
            var name = filename.substr(5, 3);
            $(".titlearea").val(chooseDetail[name][0]);
        };
    } else {
        $(".titlearea").val($(".move .title").text());
    };
    if ($(".move .con img:visible").length > 0) {
        var consrc = $('.con img')[0].src;
        var filename = getFileName(consrc);
        if (filename) {
            var name = filename.substr(3, 3);
            $(".contentarea").val(chooseDetail[name][1]);
        };
    } else {
        $(".contentarea").val($(".move .txt").text());
    };
    $(".inputarea").show();
});
$(".page5 .contentarea").focusout(function(event) {
    if ($(".contentarea").val().replace(/\s+/g, "").length > 36) {
        var contentval = $(".contentarea").val().replace(/\s+/g, "").substring(0, 36);
        $(".contentarea").val(contentval);
        alert("正文内容不能超过36个字");
    };
});
$(".nav1").click(function(event) {
    location.hash = "";
    location.reload();
});
$(".nav2,.zqdzbtn").click(function(event) {
    location.hash = "zqdz";
    location.reload();
});
$(".nav3").click(function(event) {
    location.hash = "gshb";
    location.reload();
});
$(".nav4").click(function(event) {
    event.stopPropagation();
    $(".qr").toggle();

});
$("body").click(function(e) {
    if ($(".qr:visible").length > 0) {
        $(".nav4").trigger('click');
    }
});
$(".nav5").click(function(event) {
    window.open("http://service.weibo.com/share/share.php?title=是否有三个字，一直想对Ta说。言短情长，至臻心意。&url=http://xmas2015.ferrero-praline.com.cn/index.html&source=&appkey=&pic=http%3A%2F%2Fxmas2015.ferrero-praline.com.cn%2Fimg%2Fpage4%2Fimgqcz.jpg%7C%7Chttp%3A%2F%2Fxmas2015.ferrero-praline.com.cn%2Fimg%2Fpage4%2Fimgwan.jpg%7C%7Chttp%3A%2F%2Fxmas2015.ferrero-praline.com.cn%2Fimg%2Fpage4%2Fimgxxn.jpg&searchPic=false", "weibo", 'toolbar=0,resizable=1,scrollbars=yes,status=1,width=450,height=330')
});
$(".page7 .chooseimg img").click(function(event) {
    var imgsrc = $(this).data('img');
    $(this).addClass('selected').siblings('img').removeClass('selected');
    $(".poster img").attr('src', 'img/page7/' + imgsrc + '.jpg');
});
$(".page7 .prev").click(function(event) {
    $(".chooseimg .selected").prev().trigger("click");
});
$(".page7 .next").click(function(event) {
    $(".chooseimg .selected").next().trigger("click");
});

function getFileName(str) {
    var reg = /[^\\\/]*[\\\/]+/g;
    str = str.replace(reg, '');
    return str;
}
$(".right").on('click', '#upload', upload);
$(".right").on('click', '.drawimg', drawimg);

function upload(event) {
    event.preventDefault();
    (function() {
        var src = $(".page5 .left img").attr('src');
        $('.image-editor').cropit({
            initialZoom: "image",
            smallImage: "stretch",
            onImageLoaded: function() {
                $(".cut").show();
            }
        });
        $('.export').click(function() {
            var imageData = $('.image-editor').cropit('export');
            $(".page5 .left img")[0].src = imageData;
            $(".cut").hide();
        });
    })();
    $(".cropit-image-input").trigger('click');
}

function drag() {
    $('#draggable').udraggable({
        containment: 'parent',
        drag: function(e, ui) {
            var pos = ui.position
            movex = pos.left;
            movey = pos.top;
        }
    });
    /*var left = (581 - $(".page5 .con img").width())/2;
    $(".move").css('left',left );*/
}

function drawimg(event) {
    var x = (movex + 200) * 1.1 || 325;
    var y = (movey + 1) * 1.1 || 187;
    var can = document.getElementById('can');
    var img = $(".left img")[0];
    var title = $(".move .title").text();
    var titleimg;
    var text = $(".move .txt").text();
    $(".drawimg").css('background', 'url(img/page5/wait.png)');
    strEdit = function(string) {
        var obj = {};
        obj.contenttxt1 = string.substring(0, 18);
        obj.contenttxt2 = string.substring(18, 36);
        obj.arr = string.split("");
        obj.arrlength = obj.arr.length;
        return obj;
    }
    var o = strEdit(text);
    var ctx = can.getContext('2d');
    var width = $(".move .con").width() / 2;
    ctx.drawImage(img, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    if ($(".move .con img:visible").length > 0) {
        conimg = $(".move .con img")[0];
        ctx.shadowBlur = 0;
        ctx.drawImage(conimg, movex * 1.1 || (290 - width) * 1.1, (movey + 123) * 1.1 || 300, $(".move .con img").width() * 1.1, $(".move .con img").height() * 1.1);
    } else {
        ctx.textAlign = 'center';
        ctx.shadowBlur = 10;
        ctx.font = "77px 黑体";
        ctx.shadowColor = "black";
        ctx.fillStyle = "#fff";
        ctx.fillText(title, x, y + 100);
        ctx.font = "24px 黑体";
        ctx.fillStyle = "#fff";
        ctx.fillText(o.contenttxt1, x, y + 170);
        ctx.fillText(o.contenttxt2, x, y + 205);
    };
    if ($(".move .title img").length > 0) {
        titleimg = $(".move .title img")[0];
        ctx.shadowBlur = 0;
        ctx.drawImage(titleimg, (movex + width - 127) * 1.1 || 180, (movey + 20) * 1.1 || 165 * 1.1, $(".move .title img").width() * 1.1, $(".move .title img").height() * 1.1);
    };
    dataURL = can.toDataURL();
    picurl = null;
    getPicurl();
    $(".smallpic").attr('src', dataURL).addClass('animate');
    $(".smallpic2").attr('src', dataURL)

    function getPicurl() {
        $.ajax({
            type: "POST",
            url: "../api/index.php",
            data: {
                ref: "indexforpc",
                img: dataURL
            },
            dataType: "json",
            success: function(data) {
                picurl = data.imageid;
                window.setTimeout(function() {
                    $(".page5").hide();
                    $(".page6").show();
                }, 500)
            }
        })
    }

};
$(".shareposter").on("click", function() {
    window.open("http://service.weibo.com/share/share.php?title=心中藏着三个字，只想对一个人说，是你吗？&url=http://xmas2015.ferrero-praline.com.cn/pcshare/index.html?pic=" + picurl + "&source=&appkey=&pic=http://xmas2015.ferrero-praline.com.cn/api/" + picurl + "&searchPic=false", "weibo", 'toolbar=0,resizable=1,scrollbars=yes,status=1,width=450,height=330')
});

uploader.on('fileQueued', function(_file) {
    file = _file;

    uploader.makeThumb(file, function(error, src) {

        if (error) {
            alert('不能预览');
            return;
        } else {
            uploadsrc = new Image();
            uploadsrc.src = src;
            $('.image-editor').cropit({
                imageState: uploadsrc,
                initialZoom: "min",
                smallImage: "stretch",
                onImageLoaded: function() {
                    $(".cut").show();
                }
            });
            $('.export').click(function() {
                var imageData = $('.image-editor').cropit('export');
                $(".page5 .left>img")[0].src = imageData;
                $(".cut").hide();
            });
        }

    }, 1600, 1); // 注意这里的 height 值是 1，被当成了 100% 使用。
});

/* 显示遮罩层 */
function showOverlay() {
    $("#overlay").height(pageHeight());
    $("#overlay").width(pageWidth());
    $("#phone").show();
    adjust("#phone");
    $("#overlay").fadeIn(200);
}
$("#phone .send").click(function(event) {
    var phoneReg = /^1[358]\d{9}$/;
    var phonenum = $("#enter").val();
    if (phoneReg.test(phonenum) == false) {
        alert("填写的手机号码格式不正确");
        return false;
    } else {
        $.ajax({
            type: "POST",
            url: "../api/index.php",
            data: {
                ref: "indexforpc2",
                mobile: phonenum,
                imageid: picurl.substr(0, 13)
            },
            dataType: "json",
            success: function(data) {}
        })
        tmallshow();
    }
});

function tmallshow() {
        $("#phone").fadeOut();
        $("#tcode").text(picurl.replace(/\.png/, ""));
        $("#tmall").fadeIn();
        adjust("#tmall");
        var agent = browserRedirect();
        $('.copy').zclip({
            path: 'js/zclip/ZeroClipboard.swf',
            copy: function() { //复制内容 
                return $('#tcode').text();
            },
            afterCopy: function() { //复制成功 
                alert("复制成功")
            }
        });
        if (agent) {
            $(".zclip").click(function(event) {
                alert('请同时按住Home键和Power键截屏保存图片ID')
            });
        };
    }
    /* 隐藏覆盖层 */
function hideOverlay() {
    $("#phone").fadeOut(100);
    $("#tmall").fadeOut(100);
    $("#overlay").fadeOut(200);
    $('.copy').zclip('remove');
}

/* 当前页面高度 */
function pageHeight() {
    return document.body.scrollHeight;
}

/* 当前页面宽度 */
function pageWidth() {
        return document.body.scrollWidth;
    }
    /* 定位到页面中心 */
function adjust(id) {
    var w = $(id).width();
    var h = $(id).height();

    var t = scrollY() + (windowHeight() / 2) - (h / 2);
    if (t < 0) t = 0;

    var l = scrollX() + (windowWidth() / 2) - (w / 2);
    if (l < 0) l = 0;

    $(id).css({
        left: l + 'px',
        top: t + 'px'
    });
}

//浏览器视口的高度
function windowHeight() {
    var de = document.documentElement;

    return self.innerHeight || (de && de.clientHeight) || document.body.clientHeight;
}

//浏览器视口的宽度
function windowWidth() {
    var de = document.documentElement;

    return self.innerWidth || (de && de.clientWidth) || document.body.clientWidth
}

/* 浏览器垂直滚动位置 */
function scrollY() {
    var de = document.documentElement;

    return self.pageYOffset || (de && de.scrollTop) || document.body.scrollTop;
}

/* 浏览器水平滚动位置 */
function scrollX() {
    var de = document.documentElement;

    return self.pageXOffset || (de && de.scrollLeft) || document.body.scrollLeft;
}

function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        return true;
    } else {
        return false;
    }
}