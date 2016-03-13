$(function(){
	$(".pannel1 .logo").click(function(){
		_smq.push(['custom','Intro page','FERRERO ROCHER图标']);
	})
	$(".pannel1 .music").click(function(){
		_smq.push(['custom','Intro page','音乐']);
	})
	$(".pannel1 .skip").click(function(){
		_smq.push(['custom','Intro page','跳过']);
	})
	$(".pannel2 .skip").click(function(){
		_smq.push(['custom','Page-1','下一页']);
	})
	$(".pannel3 .skip").click(function(){
		_smq.push(['custom','Page-1','下一页']);
	})
	$(".pannel4 .goon").click(function(){
		_smq.push(['custom','Page-2','继续']);
	})
	$(".pannel4 .choose").click(function(){
		var val=$(this).attr("data-choosevalue");
		switch(val){
			case "cxj":
				_smq.push(['custom','Page-2','6-常相聚']);
				break;
			case "zye":
				_smq.push(['custom','Page-2','2-知遇恩']);
				break;
			case "xxn":
				_smq.push(['custom','Page-2','5-谢谢你']);
				break;
			case "tgk":
				_smq.push(['custom','Page-2','3-同甘苦']);
				break;
			case "ynw":
				_smq.push(['custom','Page-2','7-忆难忘']);
				break;
			case "yxf":
				_smq.push(['custom','Page-2','8-要幸福']);
				break;
			case "wan":
				_smq.push(['custom','Page-2','9-我爱你']);
				break;
			case "szs":
				_smq.push(['custom','Page-2','10-誓终生']);
				break;
			case "qcz":
				_smq.push(['custom','Page-2','1-情长在']);
				break;
			case "zqc":
				_smq.push(['custom','Page-2','4-致青春']);
				break;
		}
	})
	$(".pannel5 .editbtn").click(function(){
		_smq.push(['custom','Page-3','编辑']);
	})
	$(".pannel5 .changemodel").click(function(){
		_smq.push(['custom','Page-3','换文字版式']);
	})
	$(".pannel5 .choosemypic").click(function(){
		_smq.push(['custom','Page-3','上传照片']);
	})
	$(".pannel5 .select li").click(function(){
		clickTimes++;
		if (clickTimes>2) {
			_smq.push(['custom','Page-3','选择照片']);			
		};

	})
	$(".pannel5 #done").click(function(){
		_smq.push(['custom','Page-3','完成']);
	})
	$(".pannel5 .done").click(function(){
		_smq.push(['custom','Page-3','完成2']);
	})
	$(".pannel6 .closebtn").click(function(){
		_smq.push(['custom','Page-5','关闭']);
	})
	$(".pannel6 .sharebtn").click(function(){
		_smq.push(['custom','Page-5','即刻分享']);
	})
	$(".pannel6 .giftbtn").click(function(){
		_smq.push(['custom','Page-5','订制专属礼盒']);
	})
})