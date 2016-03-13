(function() {
	function runtracking() {
		_smq.push(['custom', 'Intro page', '跳过']);
		_smq.push(['custom', 'Page-1', '右侧导航栏_首页']);
		_smq.push(['custom', 'Page-1', '右侧导航栏_订制']);
		_smq.push(['custom', 'Page-1', '右侧导航栏_观赏海报']);
		_smq.push(['custom', 'Page-1', 'GO']);
		chooseone[chooseran]();
		_smq.push(['custom', 'Page-2', '继续']);
		_smq.push(['custom', 'Page-2', '选择照片']);
		_smq.push(['custom', 'Page-2', '完成']);
		_smq.push(['custom', 'Page-2', '编辑']);
		_smq.push(['custom', 'Page-2', '上传自己的照片']);
		_smq.push(['custom', 'Page-2', '完成2']);
		_smq.push(['custom', 'Page-3', '查看礼盒详情']);
		_smq.push(['custom', 'Page-3', '分享海报']);
		_smq.push(['custom', 'Page-3', '购买这款礼盒']);
		_smq.push(['custom', 'Page-4', '订制这款礼盒']);
		_smq.push(['custom', 'Page-4', '选择图片']);
		_smq.push(['custom', '分享_Page-1', '告诉TA']);
	}
	var chooseone = [function() {
			_smq.push(['custom', 'Page-2', '1-情长在'])
		},
		function() {
			_smq.push(['custom', 'Page-2', '2-知遇恩'])
		},
		function() {
			_smq.push(['custom', 'Page-2', '3-同甘苦'])
		},
		function() {
			_smq.push(['custom', 'Page-2', '4-致青春'])
		},
		function() {
			_smq.push(['custom', 'Page-2', '5-谢谢你'])
		},
		function() {
			_smq.push(['custom', 'Page-2', '6-常相聚'])
		},
		function() {
			_smq.push(['custom', 'Page-2', '7-忆难忘'])
		},
		function() {
			_smq.push(['custom', 'Page-2', '8-要幸福'])
		},
		function() {
			_smq.push(['custom', 'Page-2', '9-我爱你'])
		},
		function() {
			_smq.push(['custom', 'Page-2', '10-誓终生'])
		},
		function() {
			_smq.push(['custom', 'Page-2', '11-同欢享'])
		},
		function() {
			_smq.push(['custom', 'Page-2', '12-新展望'])
		}
	];
	var chooseran = Math.floor(Math.random() * 10);
	var ran = Math.random();
	if (ran > 0.5) {
		runtracking();
	};
})()