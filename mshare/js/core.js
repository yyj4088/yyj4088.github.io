$(document).ready(function() {
	var picid = getQueryString("id");
	
	$(".imgcontainer img")[0].src="../api/"+picid;

	$(".home").click(function(){
		_smq.push(['custom','分享_Page-2','告诉TA']);
	})

	$(".pannel1 .music").click(function(){
		_smq.push(['custom','分享_Page-1','音乐']);
	})

	$(".music").click(function(){
		var audiosrc=$("#musichide audio").get(0);
		if (audiosrc.paused) {
			audiosrc.play();
			$(".music").addClass("animate");
		}else{
			audiosrc.pause();
			$(".music").removeClass("animate");
		};
	})
});
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
function ham(idname,recognizer,action,callback) {
	var myElement = document.getElementById(idname);

	// create a simple instance
	// by default, it only adds horizontal recognizers
	var mc = new Hammer(myElement);

	// let the pan gesture support all directions.
	// this will block the vertical scrolling on a touch-device while on the element
	mc.get(recognizer).set({
		direction: Hammer.DIRECTION_ALL
	});

	// listen to events...
	mc.on(action, callback);
}

function ham1(){
	return ham('panel1','swipe',"swipeup swipedown",function(ev) {
		_smq.push(['custom','分享_Page-1','下一页']);
		$(".pannel1").fadeOut('100');
		$(".pannel2").fadeIn('400');
		$(".mask .f1,.mask .f2,.mask .f3,.mask .f4").height(document.body.clientHeight);
	});
}
window.setTimeout(ham1,6000);
var once = true;
ham('mask','pan',"panleft panright panup pandown tap press",function(ev) {
		_smq.push(['custom','分享_Page-2','摩擦摩擦 拭去金沙']);
		if (once) {
			once = false;
			$(".mask .f1").hide();
			$(".mask .touch").hide();
			$(".mask .f2").show();	


			window.setTimeout(play1,300);
			window.setTimeout(play2,600);
			window.setTimeout(play3,900);
			function play1(){
				$(".mask .f2").hide();
				$(".mask .f3").show();
			}
			function play2(){
				$(".mask .f3").hide();
				$(".mask .f4").show();
			}
			function play3(){
				$(".mask").hide();
			}	
		};
	})
