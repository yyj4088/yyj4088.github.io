<?php
/*
CREATE TABLE `ccp_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `mobile` varchar(11) DEFAULT NULL,
  `imgid` varchar(100) DEFAULT NULL,
  `addtime` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
*/

$dbhost=localhost;
$username=your_name;
$userpass=your_pass;
$dbdatabase=your_database;

$db_connect=mysql_connect($dbhost,$username,$userpass) or die("Unable to connect to the MySQL!");
mysql_select_db($dbdatabase,$db_connect);
?>