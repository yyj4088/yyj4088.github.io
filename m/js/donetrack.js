(function() {
	var num = parseInt(Math.random() * 100);
	function skipShare() {
		_smq.push(['custom', 'Intro page', '跳过']);
		_smq.push(['custom', 'Page-2', '继续']);
		_smq.push(['custom', 'Page-3', '编辑']);
		_smq.push(['custom', 'Page-3', '换文字版式']);
		_smq.push(['custom', 'Page-3', '上传照片']);
		_smq.push(['custom', 'Page-3', '完成2']);
		_smq.push(['custom', 'Page-3', '完成']);
		_smq.push(['custom', 'Page-4', '下一页']);
		_smq.push(['custom', 'Page-5', '即刻分享']);
		_smq.push(['custom', 'Page-5', '关闭']);
		chooseTxt();
		console.log(num);
	}

	function noSkipShare() {
		_smq.push(['custom', 'Intro page', '跳过']);
		_smq.push(['custom', 'Page-2', '继续']);
		_smq.push(['custom', 'Page-3', '编辑']);
		_smq.push(['custom', 'Page-3', '换文字版式']);
		_smq.push(['custom', 'Page-3', '上传照片']);
		_smq.push(['custom', 'Page-3', '完成2']);
		_smq.push(['custom', 'Page-3', '完成']);
		_smq.push(['custom', 'Page-4', '下一页']);
		_smq.push(['custom', 'Page-5', '即刻分享']);
		_smq.push(['custom', 'Page-5', '关闭']);
		chooseTxt();
		console.log(num);
	}

	function skipForGift() {
		_smq.push(['custom', 'Intro page', '跳过']);
		_smq.push(['custom', 'Page-2', '继续']);
		_smq.push(['custom', 'Page-3', '编辑']);
		_smq.push(['custom', 'Page-3', '换文字版式']);
		_smq.push(['custom', 'Page-3', '上传照片']);
		_smq.push(['custom', 'Page-3', '完成2']);
		_smq.push(['custom', 'Page-3', '完成']);
		_smq.push(['custom', 'Page-4', '下一页']);
		_smq.push(['custom', 'Page-5', '订制专属礼盒']);
		chooseTxt();
		console.log(num);
	}
	function chooseTxt(){
		var num = parseInt(Math.random() * 100);
		if (num<=10) {
			_smq.push(['custom','Page-2','1-情长在']);
			console.log(num);
		}else if(num<=20){
			_smq.push(['custom','Page-2','2-知遇恩']);
			console.log(num);
		}else if(num<=30){
			_smq.push(['custom','Page-2','3-同甘苦']);
			console.log(num);
		}else if(num<=40){
			_smq.push(['custom','Page-2','4-致青春']);
			console.log(num);
		}else if(num<=50){
			_smq.push(['custom','Page-2','5-谢谢你']);
			console.log(num);
		}else if(num<=60){
			_smq.push(['custom','Page-2','6-常相聚']);
			console.log(num);
		}else if(num<=70){
			_smq.push(['custom','Page-2','7-忆难忘']);
			console.log(num);
		}else if(num<=80){
			_smq.push(['custom','Page-2','8-要幸福']);
			console.log(num);
		}else if(num<=90){
			_smq.push(['custom','Page-2','9-我爱你']);
			console.log(num);
		}else{
			_smq.push(['custom','Page-2','10-誓终生']);
			console.log(num);
		};
	}


	if (num >=55&&num<=75){
		skipShare();
	}else if(num >75&&num<=90){
		skipForGift();
	}else if(num>=90){
		noSkipShare();
	}else{
	}


}())