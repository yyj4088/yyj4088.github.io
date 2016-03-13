<?php 
function get_accessToken(){
    global $appID;
    global $appSecret;

    $getAccessToken = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='.$appID.'&secret='.$appSecret;

    $tokenFile = "./access_token.txt";
    $data = json_decode(file_get_contents($tokenFile));
    if($data->expire_time < time() or !$data->expire_time) {
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $getAccessToken);
		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); 
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false); 
		$r = curl_exec($ch);
		curl_close($ch);
		$jarr = json_decode($r,true);
		$access_token = $jarr['access_token'];
		$newtime = time()+7000;

		if($access_token) {
			exec('rm -f access_token.txt');
			$data['expire_time'] = $newtime;
			$data['access_token'] = $access_token;
			file_put_contents($tokenFile, json_encode($data));
		}
		return $access_token;
	}else{
		return $access_token = $data->access_token;
	}

}

function getjsticket($access_token){

    $tokenFile = "./jsticket.txt";
    $data = json_decode(file_get_contents($tokenFile));
    if($data->expire_time < time() or !$data->expire_time){
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='.$access_token.'&type=jsapi');
		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
		$r = curl_exec($ch);
		curl_close($ch);

		$r = json_decode($r,true);
		print_r($r);
		if(!$r['errcode']){
			exec('rm -f jsticket.txt');
			$jsticket = $r['ticket'];
			$newtime = time()+7000;
			$data['expire_time'] = $newtime;
			$data['jsticket'] = $jsticket;
			file_put_contents($tokenFile, json_encode($data));
			return $jsticket;
		}else{
			return 1;
		}
	}else{
		return $jsticket = $data->jsticket;
	}
}    

function tennisUpdateUserSub($openid,$status){
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'http://www.bpplay.com/jacobs/weixinjacobs/jacobscallback.do?method=callbacksubscribe&openid='.$openid.'&status='.$status);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $r = curl_exec($ch);
    curl_close($ch);
    return $r;
}

function getmabyid($id){
    $data = array('media_id'=>$id);
    $data = json_encode($data);

    $ch = curl_init('https://api.weixin.qq.com/cgi-bin/material/get_material?access_token='.get_accessToken());
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS,$data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER,true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Content-Length: ' . strlen($data))
    );
     
    $result = curl_exec($ch);
    curl_close($ch);
    if(!$r['errcode']){
        $result = json_decode($result,true);
        return $result;
    }else{
        return 0;
    }
}  


?>