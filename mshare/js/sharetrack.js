(function() {
	var num = parseInt(Math.random() * 100);
	function share() {
		_smq.push(['custom','分享_Page-1','下一页']);
		_smq.push(['custom','分享_Page-2','摩擦摩擦 拭去金沙']);
		_smq.push(['custom','分享_Page-2','告诉TA']);
		console.log(num);
	}
	if (num >=55){
		share();
	}
}())