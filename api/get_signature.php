<?php 
require_once('config.php');
require_once('functions.php');  

if(!$_GET['signurl']){
    $msg['haserror'] = 1;
    $msg['errormsg'] = 'signurl is required';
    echo json_encode($msg);
    exit;
}

$access_token = get_accessToken();
if($access_token){
    $jsticket = getjsticket($access_token);
    if($jsticket){
        $noncestr = 'Wm3WZYTPz0wzccnW';
        $timestamp = time();
        $url=urldecode($_GET['signurl']);
        $str = 'jsapi_ticket='.$jsticket.'&noncestr='.$noncestr.'&timestamp='.$timestamp.'&url='.$url;
        $msg['haserror'] = 0;
        $msg['appId'] = $appID;
        $msg['jsapi_ticket'] = $jsticket;
        $msg['signature'] = sha1($str);
        $msg['timestamp'] = $timestamp;
        $msg['nonceStr'] = $noncestr;
        $msg['url'] = $url;
        echo json_encode($msg);
        exit;
    }else{
        $msg['haserror'] = 1;
        $msg['errormsg'] = 'get jsticket error';
        echo json_encode($msg);
        exit;
    }
}else{
    $msg['haserror'] = 1;
    $msg['errormsg'] = 'get access_token error';
    echo json_encode($msg);
    exit;
}

?>