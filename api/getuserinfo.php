<?php
require_once('config.php');
require_once('functions.php'); 

$openid = $_GET['openid'];
$access_token = $_GET['access_token'];
$scope = $_GET['scope'];
$refresh_token = $_GET['refresh_token'];
if(!isset($openid)){
    $msg['haserror'] = 1;
    $msg['errormsg'] = 'openid is required';
    echo json_encode($msg);
    exit;
}

if(!isset($scope)){
    $msg['haserror'] = 1;
    $msg['errormsg'] = 'scope is required';
    echo json_encode($msg);
    exit;
}

if($scope != 'user' && $scope != 'global'){
    $msg['haserror'] = 1;
    $msg['errormsg'] = 'scope is incorrect';
    echo json_encode($msg);
    exit;
}

if($scope == 'user'){
    if(!isset($access_token) || !isset($refresh_token)){
        $msg['haserror'] = 1;
        $msg['errormsg'] = 'web access_token and refresh_token is required';
        echo json_encode($msg);
        exit;
    }
    //check access_token is correct
    $ch2 = curl_init('https://api.weixin.qq.com/sns/auth?access_token='.$access_token.'&openid='.$openid);
    curl_setopt($ch2, CURLOPT_RETURNTRANSFER, 1);    // 要求结果为字符串且输出到屏幕上
    curl_setopt($ch2, CURLOPT_HEADER, 0); // 不要http header 加快效率
    curl_setopt($ch2, CURLOPT_SSL_VERIFYPEER, false); 
    curl_setopt($ch2, CURLOPT_SSL_VERIFYHOST, false); 

    $result2 = curl_exec($ch2);
    $result2 = json_decode($result2,true);
    //var_dump(json_decode($result,true));
    curl_close($ch2);
    if($result2['errcode']){
        //need refresh accdss_token
        $ch3 = curl_init('https://api.weixin.qq.com/sns/oauth2/refresh_token?appid='.$appID.'&grant_type=refresh_token&refresh_token='.$refresh_token);
        curl_setopt($ch3, CURLOPT_RETURNTRANSFER, 1);    // 要求结果为字符串且输出到屏幕上
        curl_setopt($ch3, CURLOPT_HEADER, 0); // 不要http header 加快效率
        curl_setopt($ch3, CURLOPT_SSL_VERIFYPEER, false); 
        curl_setopt($ch3, CURLOPT_SSL_VERIFYHOST, false); 

        $result3 = curl_exec($ch3);
        $result3 = json_decode($result3,true);
        //var_dump(json_decode($result,true));
        curl_close($ch3);
        if($result3['errcode']){
            $result3['haserror'] = 1;
            $result3['errormsg'] = 'refresh access_token fail.';
            echo json_encode($result3);
            exit;
        }else{
            $access_token = $result3['access_token'];
        }
    }

    $ch = curl_init('https://api.weixin.qq.com/sns/userinfo?access_token='.$access_token.'&openid='.$openid.'&lang=zh_CN');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);    // 要求结果为字符串且输出到屏幕上
    curl_setopt($ch, CURLOPT_HEADER, 0); // 不要http header 加快效率
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); 
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false); 
    $result = curl_exec($ch);
    curl_close($ch);
    $msg = json_decode($result,true);
    if($msg['errcode']){
        $msg['haserror'] = 1;
        $msg['errormsg'] = 'get userinfo use web access_token fail.';
        echo json_encode($msg);
        exit;
    }
    $msg['haserror'] = 0;
    echo json_encode($msg);
    exit;
}

if($scope == 'global'){
    $access_token = get_accessToken();
    if(!$access_token){
        $msg['haserror'] = 1;
        $msg['errormsg'] = 'get global access_token error';
        echo json_encode($msg);
        exit;
    }
    $ch = curl_init('https://api.weixin.qq.com/cgi-bin/user/info?access_token='.$access_token.'&openid='.$openid.'&lang=zh_CN');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);    // 要求结果为字符串且输出到屏幕上
    curl_setopt($ch, CURLOPT_HEADER, 0); // 不要http header 加快效率
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); 
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false); 
    $result = curl_exec($ch);
    curl_close($ch);
    $msg = json_decode($result,true);
    if($msg['errcode']){
        $msg['haserror'] = 1;
        $msg['errormsg'] = 'get userinfo use global access_token fail.';
        echo json_encode($msg);
        exit;
    }
    $msg['haserror'] = 0;
    echo json_encode($msg);
    exit;
}


?>