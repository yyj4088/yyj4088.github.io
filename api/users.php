<?php
header("Content-Type:text/html;charset=UTF-8");
?>
<html>
<head>
<style type="text/css">
body {
	font: normal 11px auto "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;
	color: #4f6b72;
	background: #E6EAE9;
}

a {
	color: #c75f3e;
}

#mytable {
	#width: 100%;
	padding: 0;
	margin: 0;
}

caption {
	padding: 0 0 5px 0;
	width: 700px;
	font: italic 11px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;
	text-align: right;
}

th {
	font: bold 11px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;
	color: #4f6b72;
	border-right: 1px solid #C1DAD7;
	border-bottom: 1px solid #C1DAD7;
	border-top: 1px solid #C1DAD7;
	letter-spacing: 2px;
	text-transform: uppercase;
	text-align: left;
	padding: 6px 6px 6px 12px;
	background: #CAE8EA no-repeat;
}

th.nobg {
	border-top: 0;
	border-left: 0;
	border-right: 1px solid #C1DAD7;
	background: none;
}

td {
	border-right: 1px solid #C1DAD7;
	border-bottom: 1px solid #C1DAD7;
	background: #fff;
	font-size:11px;
	padding: 6px 6px 6px 12px;
	color: #4f6b72;
}


td.alt {
	background: #F5FAFA;
	color: #797268;
}

th.spec {
	border-left: 1px solid #C1DAD7;
	border-top: 0;
	background: #fff no-repeat;
	font: bold 10px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;
}

th.specalt {
	border-left: 1px solid #C1DAD7;
	border-top: 0;
	background: #f5fafa no-repeat;
	font: bold 10px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;
	color: #797268;
}

html>body td{ font-size:11px;}
body,td,th {
font-family: 宋体, Arial;
font-size: 12px;
}
</style>
</head>
<body>

<?php
$key = $_REQUEST['key'];
include('dbconfig.php');
$sql = "SELECT * from ccp_user WHERE mobile = '".$key."' or imgid = '".$key."';";
$result = mysql_query($sql);
?>
<form action="" method="POST" name="thisform">
	<input type="text" name="key" value="<?php echo $_REQUEST['key'];?>" onfocus="if(value=='Cost'){value=''}" onblur="if(value==''){value='Cost'}"/>  
	<input type="submit" value="搜索">
</form>
<?php
echo '<table id="mytable" cellspacing="0">';
echo '<tr>';
echo '<th scope="col">手机号</th>';
echo '<th scope="col">图片id</th>';
echo '<th scope="col">图片URL</th>';
echo '<th scope="col">创建时间</th>';
echo '</tr>';

while($data = mysql_fetch_array($result)){
	echo '<tr>';
	echo '<td scope="col">'.$data['mobile'].'</td>';
	echo '<td scope="col">'.$data['imgid'].'</td>';
	echo '<td scope="col"><a href="http://xmas2015.ferrero-praline.com.cn/api/'.$data['imgid'].'".png" target="_blank">'.$data['imgid'].'</a></td>';
	echo '<td scope="col">'.$data['addtime'].'</td>';
	echo '</tr>';
}
echo '</table>';
mysql_close($con);
?>
</html>