var isie = !!navigator.userAgent.match(/MSIE\s(.+?);/);
var ieVersion;
if(isie){
	ieVersion = navigator.userAgent.match(/MSIE\s(.+?);/)[1];
}
$(function(){
	(function(){
		//处理pad兼容性
		if(isPad()){
			var viewport = $('<meta name="viewport" content="width=1280">');
			$("title").before(viewport);
		}
	})();
	//menu操作
	$(".header h4").on("click",function(){
		//$(this).next("ul").toggle();
		$(this).toggleClass("open");
		if(ieVersion<=9){
			if($(this).hasClass("open")){
				$(this).next("ul").css("left","-300px").animate({
					left: "0px"},
					300);
			}else{
				$(this).next("ul").css("left","0").animate({
					left: "-300px"},
					300);
			}
		};
	});
	
	
	//搜索操作
	$(".hd-search a").on("click",function(e){
		e.preventDefault();
		if(!$(this).parent().hasClass("open")){
			$(this).parent().addClass("open");
		}else{
			var keyword = $(this).next("input").val();
			keyword.replace(/[<>\.\*\?]/gi,"");
			if(keyword.length>0){
				window.location.href="http://www.ferrero-praline.com.cn/search?search="+encodeURIComponent(keyword);
			}
		}
	});
	//搜索关键字
	$(".hd-search input").on("keyup",function(e){
		var keycode = e.which || e.keyCode;
		if(keycode == 13){
			$(".hd-search a").click();
		}
	});

	//popin弹窗
	$("*[data-pop]").on("click",function(e){
		e.preventDefault();
		//data-pop="use dom elements classname by default"
		var $elm = $("."+$(this).data("pop"));
		if($elm.length>0){
			pop.loadpop($elm.clone());
		}
	});
	//foot wechat
	$(".footer .wechat").on("click",function(e){
		e.preventDefault();
		e.stopPropagation();
		if($(".qrcode-officalsite").length==0){
			var $tips = $("<div>").addClass("qrcode-officalsite").html("<img src='http://www.ferrero-praline.com.cn/img/common/qrcode-officalsite.jpg'>");
			$tips.css({
				"left":$(this).offset().left+50,
				"top":$(this).offset().top
			});
			$("body").append($tips);
		}else{
			$(".qrcode-officalsite").remove();
		}
	});
	//close qrcode tooltips if click body
	$("body").on("click",function(e){
		if($(".qrcode-officalsite").length>0){
			$(".footer .wechat").click();
		}
	});
});

$(window).load(function(){
	$(".header .menu > ul").height($(document).height()-$(".footer").outerHeight()-100);
})

function isPad(){
	//进入pc version，如果useragent里带mobile就认为是pad;
	return /Mobile/.test(navigator.userAgent);
	//return /Mobile/.test(navigator.userAgent) && $(window).width()<=1024;
}
var pop = {
	loadpop : function (pgname,cb){
		if($(".popin").length==0){
			var $pop = $("<div>").addClass("popin");
			$("body").append($pop);
		}
		$(".popin").empty().append(pgname);
		if(typeof cb == "function"){
			cb();
		}
		$(".popin .btn-close").on("click",function(){
			pop.unloadpop();
		})
	},
	unloadpop : function(time){
		if(!!time){
			$(".popin").fadeOut(time,function(){
				$(".popin").remove();
			});
		}else{
			$(".popin").remove();
		}
		$(".popin .btn-close").off("click")
	}
};