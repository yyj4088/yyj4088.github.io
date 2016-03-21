(function(doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			if (!clientWidth) return;
			if($(window).width()>$(window).height()){
				docEl.style.fontSize = 50 * (clientWidth / 320) + 'px';
			}else{
				docEl.style.fontSize = 50 * ($(window).height() / 568) + 'px';
			}
		};
	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	$(function(){
		recalc();
	})
	//doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);