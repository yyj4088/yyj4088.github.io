<?php 
/**
 *	前端API接口	
 */
include('dbconfig.php');

$ref = $_GET['ref']==null?$_POST['ref']:$_GET['ref'];
$ref = trim($ref);

switch($ref){
	//
	case 'index':
		index();
		break;

    case 'indexforpc':
        indexforpc();
        break;

    case 'indexforpc2':
        indexforpc2();
        break;

	case 'uploadpic':
		uploadpic();
		break;

	case 'uploadfile':
		uploadfile();
		break;

	default:
		donothing();
}


function index(){
    $img = $_POST['img'];
    $callback = $_POST['callback'];

    $img = str_replace('data:image/png;base64,','',$img);
    $img = str_replace(' ','+',$img);
    $data = base64_decode($img);
    $file = uniqid().'.png';
    $success = file_put_contents($file,$data);
    if($success){
        $addtime = date('Y-m-d H:i:s');

        $return['imageid'] = $file;
        $return['success'] = 1;
    }else{
        $return['success'] = 0;
    }
    if($callback)
        echo $callback.'('.json_encode($return).')';
    else
        echo json_encode($return);
}

function indexforpc(){
    $img = $_POST['img'];
    $callback = $_POST['callback'];

    $img = str_replace('data:image/png;base64,','',$img);
    $img = str_replace(' ','+',$img);
    $data = base64_decode($img);
    $imgid = uniqid();
    $file = $imgid.'.png';
    $success = file_put_contents($file,$data);
    
    if($success){
        $addtime = date('Y-m-d H:i:s');
        $return['imageid'] = $file;
        $return['success'] = 1;
    }else{
        $return['success'] = 0;
    }
    if($callback)
        echo $callback.'('.json_encode($return).')';
    else
        echo json_encode($return);
}


function indexforpc2(){
    $imgid = $_POST['imageid'];
    $mobile = $_POST['mobile'];
    $callback = $_POST['callback'];

    sendSMS($mobile,$imgid);

    if($callback)
        echo $callback.'('.json_encode($return).')';
    else
        echo json_encode($return);
}

function uploadpic(){

	$picname = $_FILES['mypic']['name']; 
    $picsize = $_FILES['mypic']['size']; 
    if ($picname != "") { 
        if ($picsize > 6120000) {
            $error['error']= '图片大小不能超过6M'; 
            echo 'csr('.json_encode($error).')';
            exit; 
        } 
        $type = strstr($picname, '.');
        if ($type != ".gif" && $type != ".jpg"&& $type != ".png") { 
            $error['error']= '文件格式不对！'; 
            echo 'csr('.json_encode($error).')';
            exit; 
        } 
        $rand = rand(100, 999); 
        $pics = date("YmdHis") . $rand . $type;
        $pic_path = "../upload/". $pics; 
        move_uploaded_file($_FILES['mypic']['tmp_name'], $pic_path); 
    } 
    $size = round($picsize/1024,2);
    $arr = array( 
        'name'=>$picname, 
        'pic'=>$pics, 
        'size'=>$size 
    ); 
	echo 'csr('.json_encode($arr).')';
}

function uploadfile(){

	$filename = $_FILES['myfile']['name']; 
    $filesize = $_FILES['myfile']['size']; 
    if ($filename != "") { 
        if ($filesize > 6120000) {
            $error['error']= '文件大小不能超过6M'; 
            echo 'csr('.json_encode($error).')';
            exit;
        }

        $type = strstr($filename, '.');
        if ($type != ".doc" && $type != ".docx"&& $type != ".pdf") { 
            $error['error']= '文件格式不对！'; 
            echo 'csr('.json_encode($error).')';
            exit; 
        } 
        $rand = rand(100, 999); 
        $files = date("YmdHis") . $rand . $type;

        $file_path = "../upload/". $files; 
        move_uploaded_file($_FILES['myfile']['tmp_name'], $file_path); 
    } 
    $size = round($filesize/1024,2);
    $files_='upload/'.$files;
    $arr = array( 
        'name'=>$files, 
        'file'=>$files_, 
        'size'=>$size 
    ); 
	echo json_encode($arr);
}


function sendSMS($mobile,$imgid){
    if(!isset($mobile) || empty($mobile)){
        $msg['haserror'] = 1;
        $msg['msg'] = 'mobile is required';
        echo json_encode($msg);
        exit;
    }
    if(!preg_match('/^\d{11}$/',$mobile)){
        $msg['haserror'] = 1;
        $msg['msg'] = 'mobile type incorrect';
        echo json_encode($msg);
        exit;
    }

    $addtime = date('Y-m-d H:i:s');
    $sql = "insert into ccp_user(mobile,imgid,addtime) values('".$mobile."','".$imgid."','".$addtime."');";
    mysql_query($sql);

    $ch = curl_init();
    $url = "http://sms.bechtech.cn/Api/send/data/json?accesskey=2952&secretkey=7274d1014892218130b2ff1b24aa6606b2a2ad8b&mobile=".$mobile."&content=".urlencode("亲，你的费列罗专属礼盒订制ID为：".$imgid."。请在天猫买家留言处输入，即可成功订制！【费列罗】");
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $result = curl_exec($ch);
    curl_close($ch);
    $result = json_decode($result,true);
    //print_r($result);
    if($result['result'] == '01'){
        $msg['haserror'] = 0;
        $msg['msg'] = 'send validate message to '.$mobile.' ok';
        echo json_encode($msg);
        exit;
    }else{
        $msg['haserror'] = 1;
        $msg['msg'] = 'send validate message to '.$mobile.' error';
        echo json_encode($msg);
        exit;
    }
}


function donothing(){
	$return = 'nothing...';
	echo 'csr('.json_encode($return).')';
}
?>