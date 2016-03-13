<?php
require_once('config.php');
require_once('functions.php');

$wechatObj = new wechatCallbackapiTest();

if($_GET['echostr']){
	$wechatObj->valid();
}else{
	$wechatObj->assign();
}
//get_accessToken();

class wechatCallbackapiTest
{

    public function get_userInfoById($openID){
        $ch = curl_init('https://api.weixin.qq.com/cgi-bin/user/info?access_token='.get_accessToken().'&openid='.$openID.'&lang=zh_CN');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);    // 要求结果为字符串且输出到屏幕上
        curl_setopt($ch, CURLOPT_HEADER, 0); // 不要http header 加快效率
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); 
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false); 
     
        $result = curl_exec($ch);
        curl_close($ch);
        return json_decode($result,true);
    }

    public function setUserGroup($openID,$group){
        if($group == 'tennis'){
            $gid = 112;
        }
        if($group == 'mot'){
            $gid = 113;
        }
        $data['openid'] = (string)$openID;
        $data['to_groupid'] = $gid;
        $data_string = json_encode($data);

        $ch = curl_init('https://api.weixin.qq.com/cgi-bin/groups/members/update?access_token='.get_accessToken());
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS,$data_string);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER,true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            'Content-Length: ' . strlen($data_string))
        );
         
        $result = curl_exec($ch);
        curl_close($ch);

    }

    public function assign(){
        echo "";
        $xmlResult = simplexml_load_string(file_get_contents('php://input'),'SimpleXMLElement', LIBXML_NOCDATA);
        if($xmlResult->MsgType == 'event' && $xmlResult->Event == 'unsubscribe'){
            tennisUpdateUserSub($xmlResult->FromUserName,'0');
            exit;
        }
        if($xmlResult->MsgType == 'event' && $xmlResult->Event == 'subscribe'){
            if($xmlResult->EventKey == 'qrscene_tennis'){
                $this->responseMsgTennis($xmlResult->FromUserName,$xmlResult->ToUserName,true);
                $this->setUserGroup($xmlResult->FromUserName,'tennis');
                $this->opSql($xmlResult->FromUserName,$xmlResult->CreateTime,$xmlResult->MsgType,$xmlResult->Event,$xmlResult->EventKey,$xmlResult->Ticket);
            }else if($xmlResult->EventKey == 'qrscene_mot'){
                $this->responseMsg($xmlResult->FromUserName,$xmlResult->ToUserName,true);
                $this->setUserGroup($xmlResult->FromUserName,'mot');
                $this->opSql($xmlResult->FromUserName,$xmlResult->CreateTime,$xmlResult->MsgType,$xmlResult->Event,$xmlResult->EventKey,$xmlResult->Ticket);

            }else{
                $this->responseMsg($xmlResult->FromUserName,$xmlResult->ToUserName,false);
                $this->opSql($xmlResult->FromUserName,$xmlResult->CreateTime,$xmlResult->MsgType,$xmlResult->Event,'','');
            }
            tennisUpdateUserSub($xmlResult->FromUserName,'1');
            exit;
        }

        if($xmlResult->MsgType == 'event' && $xmlResult->Event == 'SCAN' && $xmlResult->EventKey == 'tennis'){
            $this->setUserGroup($xmlResult->FromUserName,'tennis');
            $this->opSql($xmlResult->FromUserName,$xmlResult->CreateTime,$xmlResult->MsgType,$xmlResult->Event,$xmlResult->EventKey,$xmlResult->Ticket);
            exit;
        }

        if($xmlResult->MsgType == 'event' && $xmlResult->Event == 'SCAN' && $xmlResult->EventKey == 'mot'){
            $this->setUserGroup($xmlResult->FromUserName,'mot');
            $this->opSql($xmlResult->FromUserName,$xmlResult->CreateTime,$xmlResult->MsgType,$xmlResult->Event,$xmlResult->EventKey,$xmlResult->Ticket);
            exit;
        }
        
    }

    public function responseMsgTennis($fromUsername,$toUsername,$t){
        $textTpl = "<xml>
                    <ToUserName><![CDATA[%s]]></ToUserName>
                    <FromUserName><![CDATA[%s]]></FromUserName>
                    <CreateTime>%s</CreateTime>
                    <MsgType><![CDATA[news]]></MsgType>
                    <ArticleCount>1</ArticleCount>
                    <Articles>
                    <item>
                    <Title><![CDATA[欢迎关注杰卡斯真诚如我]]></Title> 
                    <Description><![CDATA[杰卡斯邀您参与小德“真诚如我”系列影片北京分享会！无论你爱好网球还是葡萄酒，报名参加杰卡斯网球邀请赛或参与互动问答，即有机会获得2015中国网球公开赛观摩券，更有机会受邀出席世界网坛排名第一的诺瓦克•德约科维奇 “真诚如我”系列影片分享会。立即点开此页面参与互动吧！]]></Description>
                    <PicUrl><![CDATA[http://glp.nurunci.com/wc/img/wxcover150623.jpeg]]></PicUrl>
                    <Url><![CDATA[http://glp.nurunci.com/wc/skip.php?type=base&reurl=http://www.bpplay.com/jacobs/weixinjacobs/weixinjacobs_index.do?method=index]]></Url>
                    </item>
                    </Articles>
                    </xml>";           
        
        $resultStr = sprintf($textTpl, $fromUsername, $toUsername, time()); 
        
        echo $resultStr;
                
    }

    public function responseMsg($fromUsername,$toUsername,$spe){
  
        $textTpl = "<xml>
                    <ToUserName><![CDATA[%s]]></ToUserName>
                    <FromUserName><![CDATA[%s]]></FromUserName>
                    <CreateTime>%s</CreateTime>
                    <MsgType><![CDATA[text]]></MsgType>
                    <Content><![CDATA[感谢您关注Nick的test！]]></Content>
                    </xml>";
        $resultStr = sprintf($textTpl, $fromUsername, $toUsername, time()); 
        
        echo $resultStr;
                
    }

    public function valid()
    {
        $echoStr = $_GET["echostr"];
        if($this->checkSignature()){
            echo $echoStr;
            exit;
        }
    }

        
    private function checkSignature()
    {
        if (!defined("TOKEN")) {
            throw new Exception('TOKEN is not defined!');
        }
        
        $signature = $_GET["signature"];
        $timestamp = $_GET["timestamp"];
        $nonce = $_GET["nonce"];
                
        $token = TOKEN;
        $tmpArr = array($token, $timestamp, $nonce);
        // use SORT_STRING rule
        sort($tmpArr, SORT_STRING);
        $tmpStr = implode( $tmpArr );
        $tmpStr = sha1( $tmpStr );
        
        if( $tmpStr == $signature ){
            return true;
        }else{
            return false;
        }
    }
}

?>