<?php 
require_once('config.php');
function anzUrl($reurl){
    if(strpos($reurl,'?')){
        $t = explode('?',$reurl);
        $parr['reurl'] = $t[0];
        $t = explode('&', $t[1]);
        foreach($t as $param){
            $c = explode('=', $param);
            $parr[$c[0]] = $c[1];
        }
    }else{
        $parr['reurl'] = $reurl;
    }
    return $parr;
}

//$type = $_GET['type'];
$type = 'userinfo';
$reurl = $_GET['reurl'];

if(!isset($reurl)){
    echo 'reurl is required.';
    exit;
}
if(!isset($type)){
    echo 'type is required.';
    exit;
}
if($type != 'userinfo' && $type != 'base'){
    echo 'type is incorrect.';
    exit;
}

$reurl = urldecode($reurl);
if (isset($_COOKIE["reurl"])){
    setcookie('reurl',"",time()-3600);
    $parr = anzUrl($reurl);
    setcookie('reurl',json_encode($parr));
}else{
    $parr = anzUrl($reurl);
    setcookie('reurl',json_encode($parr));
}

echo '<script type="text/javascript">';
if($type == 'userinfo'){
    echo 'location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid='.$appID.'&redirect_uri='.urlencode('http://ccp.nurunci.com/api/skip2.php').'&response_type=code&scope=snsapi_userinfo&state=v1#wechat_redirect"';
}else{
    echo 'location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid='.$appID.'&redirect_uri='.urlencode('http://ccp.nurunci.com/api/skip2.php').'&response_type=code&scope=snsapi_base&state=v1#wechat_redirect"';
}

echo '</script>';
exit;    


?>