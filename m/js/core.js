var cid,
	label=true,
	choosestr,
	changestr,
	clickTimes=1,
	chooseDetail={
	"thx":["同欢享","分享这一年的欢甜旧事，也一起迎接新的缤纷 有你们，年才是新的","thx"],
	"xzw":["新展望","只要和你们一起，新年的每一天都精彩可期","xzw"],
	"cxj":["常相聚","你们，陪我看遍人生的每一道风景，其实，和你们常相聚，我就看到了人生的风景","cxj"],
	"zye":["知遇恩","当初因为你顶着，才有我后来的一片天，谢谢初见的是你","zye"],
	"xxn":["谢谢你","谢谢你们，在我成长的路上一直在，以后你们人生的每一步我会陪伴到底","xxn"],
	"tgk":["同甘苦","在夜夜夜的加班里，我最得意的收获，不是生意…而是情义","tgk"],
	"ynw":["忆难忘","那时最不听您的话，但现在我最常记忆的，都是您说过的话","ynw"],
	"yxf":["要幸福","我等到了我的幸福，你的幸福也已经在路上","yxf"],
	"wan":["我爱你","觉得和你在一起的那一下子我想到的是一辈子","wan"],
	"szs":["誓终生","因为有你一起，慢慢变老成了我最期待的事","szs"],
	"qcz":["情长在","那些照片虽然已发黄，但我们一起调和的青春颜色确常驻在我心里","qcz"],
	"zqc":["致青春","你们是我青春盛宴里，不可或缺一道又一道，活色生香的主菜","zqc"],
	"qyn":["情意浓","你只是笑了一下，却让寒冷空气里溢满了浓清暖意。","qyn"],
	"wxx":["万象新","给家人的新年祝福，不需要多有新意，只要有满满的心意。","wxx"],
	"hjh":["合家欢","家里的年味从来没变，欢聚的这一刻，你们始终都是最重要的那一味。","hjh"]
	};

//禁止body上下滑动,去掉click 300ms延时
(function(){
	window.addEventListener('load', function() {
	  FastClick.attach(document.body);
	}, false);

	if (is_weixin()) {
		document.addEventListener('touchmove', function(e) {
		    e.preventDefault();
		});	
	};

}());


function is_weixin(){
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i)=="micromessenger") {
		return true;
 	} else {
		return false;
	}
};


function changePannel($pannel,cb){
		$pannel.addClass("current")
		.siblings(".pannel").removeClass("current");
		if (cb) {
			cb($pannel);	
		};			
}


function autochangePannel($pannel,cb){
	if (label) {
		$pannel.addClass("current")
		.siblings(".pannel").removeClass("current");
		if (cb) {
			cb($pannel);
		};		
	};		
}


function showTxt(cb,delay){
	var $txtContent=$(".txt"),
	cl= setInterval(function(){
		var $elm = $txtContent.find("p:not(.active)");
		if($elm.length>0){
			$elm.filter(":first").addClass("active");
		}else{
			// $(".pannel1 .slogan").addClass("active");
			clearInterval(cl);
			if (cb&&delay) {
				cid=setTimeout(function(){
					cb();
				},delay || 0)
			};
		}		
	},400);
}


function goon(){
		// autochangePannel($(".pannel2"),function($pannel){
		// 			var $flash=$pannel.find(".flash"),
		// 				$change=$pannel.find(".hb img"),
		// 				$flashtxt=$pannel.find(".flashtxt"),
		// 				len=$flash.length,
		// 				i=0,
		// 				len2=$change.length,
		// 				k=0,
		// 				flashCld,
		// 				changeCld,
		// 				changeFlash=function(cb){
		// 					var cl=setInterval(function(){
		// 						var $el=$flash.filter(":visible");
		// 						if ($el.length>0) {
		// 							$el.filter(":last").hide();
		// 						}else{
		// 							clearInterval(cl);
		// 							if(cb)
		// 								cb();
		// 						};
		// 					},200)							
		// 				};
		// 			changeFlash(
		// 				function(){
		// 					setTimeout(function(){
		// 						$pannel.find(".flashtxt3,.t3").fadeOut();
		// 						$pannel.find(".flashtxt2,.t2").fadeIn('slow');
		// 						setTimeout(function(){
		// 							$pannel.find(".flashtxt2,.t2").fadeOut();
		// 							$pannel.find(".flashtxt1,.t1").fadeIn('slow');									
		// 						},4000)
		// 					},3000)
		// 					setTimeout(function(){
		// 							autochangePannel($(".pannel3"),function($pannel){
		// 								var ele=new Hammer($pannel.get(0));
		// 								ele.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL});
		// 								$(".pannel2").remove();
		// 								$pannel.find(".pic").addClass("animate");
		// 								setTimeout(function(){
		// 									$pannel.find('.skip').hide();
		// 									$pannel.find('.arrow').show(function(){
		// 										ele.on('swipeup swipedown',function(ev){
		// 											_smq.push(['custom','Page-1','下一页']);
		// 											changeNext();
		// 										})																
		// 									});
		// 								},10000)	
		// 							})
		// 					},11000)

		// 				}
		// 			);
		// 			$('.pannel1').remove();
		// })

		autochangePannel($(".pannel3"),function($pannel){
			$('.pannel1').remove();
			$(".pannel2").remove();
			$pannel.find(".pic").addClass("animate");
			setTimeout(function(){
				$pannel.find('.skip').hide();
				// $pannel.find('.arrow').show(function(){
				// 	ele.on('swipeup swipedown',function(ev){
				// 		_smq.push(['custom','Page-1','下一页']);
				// 		changeNext();
				// 	})																
				// });
                autochangePannel($(".pannel7"),function($pannel){
                    var $card = $(".card2,.card3,.card4");
                    var pannel7Label = true;
                    var addCardClass = function(){
                        $card.addClass("animate");
                    };
                    var removeCardClass = function(){
                        $card.removeClass("animate");
                    }
                    var circulation = function(){
                        if (pannel7Label === false) {return};
                        setTimeout(function(){
                            addCardClass();
                            setTimeout(function(){
                                removeCardClass();
                                circulation();
                            },8000);
                        },1000)
                    }
                    circulation();
                    var ele=new Hammer($pannel.get(0));
                    ele.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL});
                    ele.on('swipeup swipedown',function(ev){
                        _smq.push(['custom','Page-1','下一页']);
                        $pannel.addClass("clearTran");
                        changeNext();
                        pannel7Label = false;
                    })  
                    $pannel.find('.p7pic2').on("click",function(){
                        $pannel.addClass("clearTran");
                        changeNext();
                        pannel7Label = false;
                    })                                                                          
                });
				


			},7000) //10000 5000
		})


}



function changeNext(){
		changePannel($(".pannel4"),function($pannel){
			var $moveCont=$pannel.find(".content"),
				selectA=new Hammer($moveCont.get(0)),
				$desA=$pannel.find(".select"),
				$choose=$pannel.find('.choose'),
				$next=$pannel.find(".goon"),
				$zdy=$pannel.find(".zdy"),
				desAstart,
				desAheight;
			$(".pannel3").remove();
			selectA.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL});
			selectA.on('panstart',function(){
				desAstart=parseInt($desA.css("top"));
				desAheight=$desA.outerHeight();
			})
			selectA.on('panmove',function(ev){
						$desA.css("top",desAstart+ev.deltaY+"px")
			})
			selectA.on('panend',function(){
				var desAstart=parseInt($desA.css("top")),
				mylabel=desAheight-$desA.find(".choose").outerHeight()*5;
				if (desAstart>0) {
					$desA.animate({"top":0},200)
				};
				if (desAstart<-mylabel) {	
					$desA.animate({"top":-mylabel},200)
				};
			})
			$choose.click(function(e){
					choosestr=$(this).attr("data-choosevalue");
					$(this).hide().siblings('.choose').show().end().siblings(".chooseCont").hide().end().next(".chooseCont").show();
					$choose.eq($choose.index(this)-1).removeClass("bg").siblings().addClass("bg");
			})
			$zdy.click(function(e){
				choosestr=$(this).attr("data-choosevalue");
				clickTimes=2;
				$next.click();
			})
			$next.click(function(e){
				if (typeof choosestr!=="string") {
					alert('请选择属于你的那三个字');
					return;
				};
				if (choosestr==="zdy") {
					$(".pannel5 .move .title").children("img").hide();
					$(".pannel5 .move .title").append("<p>自定义</p>");
					$(".pannel5 #cover .move").find('span').text("点击编辑，输入您的祝福语");
				}else{
					$(".pannel5 .move .title").children('img').attr("src","img/hb/"+choosestr+"h.png");
					$(".pannel5 #cover .move").find('span').text(chooseDetail[choosestr][1]);					
				};
				changestr=choosestr;
				changePannel($(".pannel5"),function($pannel){
								var $des=$pannel.find(".select ul"),
								select=$pannel.find(".select").get(0),
								$point=$pannel.find(".point span"),
								$li=$des.children("li"),
								$move=$pannel.find(".move"),
								$ediPan=$pannel.find("#editPannel"),
								$inputa=$ediPan.find(".inputarea .txtInput"),
								$inputb=$ediPan.find(".inputareb .txtInput"),
								$cutPan=$pannel.find("#cutPic"),
								requesting=false,
								txtLabel=true,
								titLabel=true,
								changeLale=true,
								moveValue=-$des.children("li").outerWidth()*4,
								mycan,
								userpath="",
								index=1,
								swipe=function(idx,moveValue,mychoose){	
										index=idx;
										var start=$des.position().left;
										$des.animate({"left":start+moveValue});
										$point.removeClass("highColor").eq(idx-1).addClass("highColor");
										if (mychoose && typeof mychoose==="number") {
											$li.eq(mychoose-1).click();
										};
								},
								createCanvas=function($canvas,link){
										var mycanvas=$canvas.get(0),
											context = mycanvas.getContext('2d'),
											images=new Image();
											if (link) {
												images.src=link;
											}else{
												if(choosestr!=="zdy"){
													images.src="img/hb/"+choosestr+"hb.jpg";
												}else{
													images.src="img/hb/qczhb.jpg";
												}
											};
											images.onload=function(e){
											context.drawImage(images,0,0,mycanvas.width,mycanvas.height);
										}
										return mycanvas;
								},
								moveDesFun=function($moveDes){
									var moveDesWidth,
										moveDesHeight,
										moveDesPosL,
										moveDesPosT,
										distancex,
										distancey,
										moveContainer;

									$moveDes.on("touchstart",function(e){
										e.preventDefault();
										moveDesWidth=$(event.currentTarget).outerWidth();
										moveDesHeight=$(event.currentTarget).outerHeight();
										moveDesPosL=$(event.currentTarget).offset().left;
										moveDesPosT=$(event.currentTarget).offset().top;
										distancex = event.touches[0].pageX - moveDesPosL;
										distancey = event.touches[0].pageY - moveDesPosT;
										moveContainer=$(window).width();
									})
									$moveDes.on("touchmove",function(e){
										if (event.touches[0].pageX-distancex<0) {
											$(this).css("left",0);
											if(event.touches[0].pageY-distancey<0){
												$(this).css("top",0);
											}else if(event.touches[0].pageY-distancey>moveContainer-moveDesHeight){
												$(this).css("top",moveContainer-moveDesHeight);
											}else{
												$(this).css("top",event.touches[0].pageY-distancey);
											}
										}else if(event.touches[0].pageX-distancex>moveContainer-moveDesWidth) {
											$(this).css("left",moveContainer-moveDesWidth);
											if(event.touches[0].pageY-distancey<0){
												$(this).css("top",0);
											}else if(event.touches[0].pageY-distancey>moveContainer-moveDesHeight){
												$(this).css("top",moveContainer-moveDesHeight);
											}else{
												$(this).css("top",event.touches[0].pageY-distancey);
											}
										}else if(event.touches[0].pageY-distancey<0){
											$(this).css("top",0);
											if(event.touches[0].pageX-distancex<0){
												$(this).css("left",0);
											}else if(event.touches[0].pageX-distancex>moveContainer-moveDesWidth){
												$(this).css("left",moveContainer-moveDesWidth);
											}else{
												$(this).css("left",event.touches[0].pageX-distancex);
											}
										}else if(event.touches[0].pageY-distancey>moveContainer-moveDesHeight){
											$(this).css("top",moveContainer-moveDesHeight);
											if(event.touches[0].pageX-distancex<0){
												$(this).css("left",0);
											}else if(event.touches[0].pageX-distancex>moveContainer-moveDesWidth){
												$(this).css("left",moveContainer-moveDesWidth);
											}else{
												$(this).css("left",event.touches[0].pageX-distancex);
											}
										}else{
											$(this).css({
													"left":event.touches[0].pageX-distancex,
													"top":event.touches[0].pageY-distancey
											});											
										};
									})

								},
								addswipeFun=function(select){
									var selectIner=new Hammer(select),
									desWidth,
									desPos,
									panRLength,
									panLLength,
									moveValue = $des.parent().width();
									selectIner.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL});								
									selectIner.on('panstart',function(ev){
										if ($des.is(":animated")) {return};
										if (ev.deltaX>0) {
											if (index>1) {
													index--;
													swipe(index,moveValue);
											};
										}else{
											if (index<4) {
													index++;
													swipe(index,-moveValue);	
											};
										};
									})
								};

								$li.click(function(e){
									$(this).addClass("highColor").siblings().removeClass("highColor");
									choosestr = $(this).attr("data-choosevalue");
									mycan= createCanvas($("#mycanvas"));
									userpath=null;
								})

								var titleTap = new Hammer($move.find(".editbtn")[0]);
									titleTap.on('tap',function(e){
										if (!$inputb.val()) {
											$inputb.val($move.find(".txt span").text());
										};
										if (!$inputa.val()) {
											if (changestr!=="zdy") {
												$inputa.val(chooseDetail[changestr][0]);
											}else{
												$inputa.val('自定义');
											};
										};
										$ediPan.show();
									})

								//判断上页选择的值
								if (typeof choosestr ==="string") {
									if (choosestr!=="zdy") {
										var mychoose = $li.index($li.filter("[data-choosevalue='"+choosestr+"']").get(0))+1,idx;
										mychoose%4>0?idx=parseInt(mychoose/4)+1:idx=mychoose/4;
										swipe(idx,moveValue*(idx-1),mychoose);
									}else{
										titLabel=false;
									};
								}
								addswipeFun(select);

								//使canvas的宽度等于窗口宽度
								$("#mycanvas").attr({"width":$(window).width(),"height":$(window).width()});
								$("#cover").css({"width":$(window).width()+"px","height":$(window).width()+"px"});
								
								mycan= createCanvas($("#mycanvas"));
								moveDesFun($move);
								$inputa.focusout(function(){
									var txt =$(this).val();
										if (txt.length>=3){
												for(i in chooseDetail){
													if (chooseDetail[i][0]===txt) {
														titLabel=true;
														changestr=chooseDetail[i][2];
														$move.find(".title p").hide();
														if (!changeLale) {
															$move.find('.title>img').attr("src","img/hb/"+changestr+"v.png").show();
														}else{
															$move.find('.title>img').attr("src","img/hb/"+changestr+"h.png").show();
														};
														break;
													}else{
														titLabel=false;	
													}
												}
												if (!titLabel) {
													$move.find(".title>img").hide();
													if ($move.find(".title p").length>0) {
														$move.find(".title p").text(txt);
													}else{
														$move.find(".title").append("<p>"+txt+"</p>");
													};
												};
										}else{
											alert("请在标题中输入三个字");
										};
								})	
								$inputb.focusout(function(){
									var txt =$(this).val();
									if(txt!==""&&txt!==null){
										txtLabel=true;
										$move.find(".txt").show();
										$move.find(".txt").empty();
										if (!changeLale) {
											if (txt.length<=20) {
												$move.find(".txt").append("<span class='vertical'>"+txt+"</span>").addClass("line1");
											};
											if(txt.length>20&&txt.length<=40){
												$move.find(".txt").append("<span class='vertical'>"+txt.substring(0,20)+"</span><span class='vertical'>"+txt.substring(20,40)+"</span>").removeClass("line1");
											}
										}else{
											$move.find(".txt").append("<span>"+txt+"</span>");
										};
									}else{
										txtLabel=false;
										$move.find(".txt span").text("");
										$move.find(".txt").hide();
									}
								})	
								
								$ediPan.find('.done').on("click",function(e){
									if ($inputa.val().length>=3){
										$ediPan.hide()
									}else{
										alert("标题内容必须输入三个字");
									};
								})								

								//change
								$pannel.children(".changemodel").click(function(e){
									var $img=$move.find('.title>img');
									if (changeLale) {
										$img.hide();
										$move.addClass("vertical").find("*").addClass("vertical");
										var $txtVertical=$move.find(".txt.vertical"),
										txtValue=$txtVertical.find('span').text(),
										txtlen=txtValue.length;
										if (txtlen>0&&txtlen<=20) {
											$txtVertical.find("span").text(txtValue);
											$txtVertical.addClass("line1");
										};
										if (txtlen>20&&txtlen<=40) {
											$txtVertical.empty();
											$txtVertical.append("<span class='vertical'>"+txtValue.substring(0,20)+"</span>")
											$txtVertical.append("<span class='vertical'>"+txtValue.substring(20)+"</span>")
											$txtVertical.removeClass("line1");
										};
										$move.css({"top":"0.25rem","left":"0.05rem"});//solve a bug    
										if (titLabel) {
											$img.attr("src","img/hb/"+changestr+"v.png").show();
										};
									}else{
										$move.find('.title >img').hide();
										var $txt=$move.find(".txt"),
										txtValue=$txt.find('span').text();
										$txt.empty();
										$txt.html("<span>"+txtValue+"</span>");
										$move.find(".editbtn").get(0).style.display="block";
										$move.css({"left":"0.58rem","top":"2.16rem"});//solve a bug
										$move.removeClass("vertical").find("*").removeClass("vertical");
										if (titLabel) {
											$img.attr("src","img/hb/"+changestr+"h.png");
											setTimeout(function(){
												$img.show();
											},50)//a bug
										};
										
									};
									changeLale=!changeLale;
								})

								//done
								$("#done").click(function (e){
									if (requesting===true) {
										return;
									};
									requesting=true;
									$("#done").css({"background":"url(img/uploading.png) no-repeat center","background-size":"100% 100%"});
									$("#done").text("请稍候");
									requestingCl=setInterval(function(){
										$("#done").text($("#done").text()+".");
										if($("#done").text().length>6){
											$("#done").text("请稍候");
										}
									},500);
									var proportion=640/$(window).width(),
										titleTop = $move.find(".title").offset().top*proportion,
										titleLeft= $move.find(".title").offset().left*proportion,
										txtTop = $move.find(".txt span").offset().top*proportion,
										txtLeft = $move.find(".txt span").offset().left*proportion,
										canvas2=$("#mycanvas2").get(0),
										context=canvas2.getContext('2d'),
										images1=new Image(),
										titletxt=$pannel.find(".title p").text(),
										contenttxt=$pannel.find(".txt span").text(),
										$txtP=$('.pannel6 p'),
										$txtPic=$('.pannel6 .txt img'),
										strEdit=function(string){
											var obj={};
											obj.contenttxt1=string.substring(0,20);
											obj.contenttxt2=string.substring(20,40);
											obj.contenttxt3=string.substring(40,60);
											obj.arr = string.split("");
											obj.arrlength=obj.arr.length;
											return obj;
										},
										strCompare=function(){
											for(i in chooseDetail){
												if (chooseDetail[i][1]==contenttxt) {
													$txtPic.get(0).src="img/txt/"+chooseDetail[i][2]+".png";
													return true;
												};
											}
										};

										if (userpath) {
											images1.src=userpath;
										}else{
											if (choosestr!=="zdy") {
												images1.src="img/hb/"+choosestr+"hb.jpg";
											}else{
												images1.src="img/hb/qczhb.jpg";
											};
											
										}


										// if (!strCompare()) {
										// 	$txtP.text(contenttxt).show();
										// 	$txtPic.parent().hide();
										// }else{
										// 	$txtP.hide();
										// 	$txtPic.parent().show();
										// };
									
										images1.onload=function(e){
											context.drawImage(images1,0,0,canvas2.width,canvas2.height);
											if (txtLabel&&contenttxt) {
												var o=strEdit(contenttxt);
													context.font="25px 黑体";//必须放在取width的前面
													var contenttxtWidth=context.measureText(o.contenttxt1).width;
													context.fillStyle = "#fff";
													context.textBaseline="hanging";
													context.textAlign="center";
													context.shadowColor="rgb(78, 74, 74)";
													context.shadowBlur=7;
												if (changeLale) {
													context.fillText(o.contenttxt1,txtLeft+contenttxtWidth/2,txtTop);
													context.fillText(o.contenttxt2,txtLeft+contenttxtWidth/2,txtTop+35);
													context.fillText(o.contenttxt3,txtLeft+contenttxtWidth/2,txtTop+70);
												}else{
													context.save();
													context.textAlign="left";
													var verticalStart=titleTop,
														verticalErr=25,
														horizontalErr=35,
														horizontalStart=titleLeft-32;
													for (var i= 0; i<o.arr.length; i++) {
														if (i<=19) {
															if (i>0) {	
																context.fillText(o.arr[i],horizontalStart,verticalStart+verticalErr);
																verticalErr+=25;
															}else{
																context.fillText(o.arr[i],horizontalStart,verticalStart);
															};
															
														}else if(i<=39){
															if (i>20) {
																context.fillText(o.arr[i],horizontalStart-horizontalErr,verticalStart+verticalErr);
																verticalErr+=25;
															}else{
																verticalErr=25;
																context.fillText(o.arr[i],horizontalStart-horizontalErr,verticalStart);
															};
														}else{
															if (i>40) {
																context.fillText(o.arr[i],horizontalStart-horizontalErr*2,verticalStart+verticalErr);
																verticalErr+=25;
															}else{
																verticalErr=25;
																context.fillText(o.arr[i],horizontalStart-horizontalErr*2,verticalStart);
															};
														};
														
													};
													context.restore();
												};
											};
											if (titLabel) {
												var images2=new Image();
												images2.src=$move.find(".title>img").attr("src");
												if (changeLale) {
													if (txtLabel) {
														images2.onload=function(e){
															context.drawImage(images2,txtLeft+contenttxtWidth/2-images2.width/2,txtTop-25-images2.height,images2.width,images2.height);
														}
													}else{
														images2.onload=function(e){
															context.drawImage(images2,titleLeft,titleTop,images2.width,images2.height);
														}													
													};
												}else{
													images2.onload=function(e){
														context.drawImage(images2,titleLeft,titleTop,images2.width,images2.height);
													}
												};

											}else{
												var t=strEdit(titletxt);
												if (changeLale) {
														if (txtLabel) {
															context.save();
															context.font="bold 70px 黑体";//必须放在取width的前面
															var t=strEdit(titletxt);
															context.fillStyle = "#fff";
															context.textBaseline="hanging";
															context.textAlign="left";
															context.shadowColor="rgb(78, 74, 74)";
															context.shadowBlur=7;
															context.fillText(t.contenttxt1,txtLeft+contenttxtWidth/2-context.measureText(t.contenttxt1).width/2,txtTop-25-70);
															context.restore();

														}else{
															context.save();
															context.font="bold 70px 黑体";//必须放在取width的前面
															context.fillStyle = "#fff";
															context.textBaseline="hanging";
															context.textAlign="left";
															context.shadowColor="rgb(78, 74, 74)";
															context.shadowBlur=7;
															context.fillText(t.contenttxt1,titleLeft+10,titleTop+15);
															context.restore();
														};

												}else{
													context.save();
													context.font="bold 70px 黑体";//必须放在取width的前面
													context.fillStyle = "#fff";
													context.textBaseline="hanging";
													context.textAlign="left";
													context.shadowColor="rgb(78, 74, 74)";
													context.shadowBlur=7;
													context.fillText(t.arr[0],titleLeft,titleTop);
													context.fillText(t.arr[1],titleLeft,titleTop+75);
													context.fillText(t.arr[2],titleLeft,titleTop+150);
													context.restore();
												};

											};
										}

										setTimeout(function(){
											var finalimg = $(".pannel6").find(".imgPreview img").get(0);
											var finalimgsrc = $("#mycanvas2").get(0).toDataURL();
											var datas={};
											var picurl=null;
											var boxpicurl=null;
											$.ajax({
											       type: "POST",
											       url: "../api/index.php",
											       data:{ref:"index",img:finalimgsrc},
											       dataType:"json",
											       success: function(data){
											       		picurl=data.imageid;
											       		finalimg.src=finalimgsrc;
											       		//-----//
														var wdbg=new Image();
														var wdimg=new Image();
														var wdimgfinalsrc;
														var wdcan=$(".pannel5").find("#mycanvas3")[0];
														var wdctx=wdcan.getContext('2d');
														wdbg.src="img/wdbg.jpg";
														wdbg.onload=function(){
																wdctx.drawImage(wdbg,0,0,wdbg.width,wdbg.height);
																wdctx.rotate(-0.19)
																wdctx.transform(1,0,0,1,115,145);
																wdimg.src=finalimgsrc;
																wdimg.onload=function(){
																	wdctx.drawImage(wdimg,0,0,160,160);
																}			
														}
														$(".pannel6 .giftpic img,.pannel6 .giftpic2 img").attr("src",finalimgsrc);
														setTimeout(function(){
															wdimgfinalsrc = wdcan.toDataURL();
															$.ajax({
															       type: "POST",
															       url: "../api/index.php",
															       data:{ref:"index",img:wdimgfinalsrc},
															       dataType:"json",
															       success:function(data){
																       boxpicurl=data.imageid;
																       if (picurl&&boxpicurl) {
																       		// $(".pannel6 .giftcontent").on("click",function(){
																       		// 	window.location="http://wx2.shhuiya.com.cn/wxpay/OrderAdd.aspx"+"?img="+picurl+"&giftimg="+boxpicurl;
																       		// })
																	       	$(".pannel6 .sharepop").find(".giftbtn").get(0).href="http://wx2.shhuiya.com.cn/wxpay/OrderAdd.aspx"+"?img="+picurl+"&giftimg="+boxpicurl;
																       };
															       }
															})
														},1000)
														//-----//
											       		//获取授权
											    //    		if (true) {
															// var ajaxurl=window.location.href.split('#')[0];
															// $.ajax({
															//     url:"/api/get_signature.php?signurl="+encodeURIComponent(ajaxurl),
															//     dataType:"json",
															//     success:function(data){
															//         datas.appId=data.appId;
															//         datas.signature=data.signature;
															//         datas.timestamp=data.timestamp;
															//         datas.nonceStr=data.nonceStr;
															//         wx.config({
															//             debug: true,
															//             appId: datas.appId,
															//             timestamp: datas.timestamp,
															//             nonceStr: datas.nonceStr,
															//             signature: datas.signature,
															//             jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
															//         });	

															// 		wx.onMenuShareAppMessage({
															// 			title: "虽然好多话我不说，你就懂。但这三个字，一定要让你知道。",
															// 			desc: "",
															// 			link: "http://ccp.nurunci.com/mshare/index.html?id="+picurl,
															// 			imgUrl: "http://xmas2015.ferrero-praline.com.cn/m/img/share.jpg",
															// 			type: 'link',
															// 			dataUrl: '',
															// 			success: function () {
															// 				var clearIer=setInterval(function(){
															// 					if (picurl&&boxpicurl) {
															// 						clearInterval(clearIer);
															// 						window.location.href="http://wx2.shhuiya.com.cn/wxpay/OrderAdd.aspx"+"?img="+picurl+"&giftimg="+boxpicurl;
															// 					};
															// 				})
															// 			},
															// 			cancel: function () {
															// 			}
															// 		});
															// 		wx.onMenuShareTimeline({
															// 			title: "虽然好多话我不说，你就懂。但这三个字，一定要让你知道。",
															// 			desc: "虽然好多话我不说，你就懂。但这三个字，一定要让你知道。",
															// 			link: "http://ccp.nurunci.com/mshare/index.html?id="+picurl,
															// 			imgUrl: "http://xmas2015.ferrero-praline.com.cn/m/img/share.jpg",
															// 			type: 'link',
															// 			dataUrl: '',
															// 			success: function () {
															// 				var clearIer=setInterval(function(){
															// 					if (picurl&&boxpicurl) {
															// 						clearInterval(clearIer);
															// 						window.location.href="http://wx2.shhuiya.com.cn/wxpay/OrderAdd.aspx"+"?img="+picurl+"&giftimg="+boxpicurl;
															// 					};
															// 				})
															// 			},
															// 			cancel: function () {
															// 			}
															// 		});
															//     }
															// })
											    //    		};
														finalimg.onload=function(e){
															requesting=false;
															changePannel($(".pannel6"),function($pannel){
																	clearInterval(requestingCl);
																var pannelEle=new Hammer($pannel.get(0)),
																	$pop=$pannel.find('.sharepop'),
																	$arrow=$pannel.find(".arrow"),
																	$light=$pop.find('.sharepenlight'),
																	$pen=$pop.find('.sharepen');
																	$pannel.find("p").text($move.find(".txt").text());
																pannelEle.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL});
																$(".pannel6 .giftbox").on("click",function(e){
																	 event.stopPropagation();
																	$("body").append("<div class='pop-detail'></div>");
																	$(".pop-detail").html("<div><img src='"+finalimgsrc+"'><img src='img/bar.jpg'></div>");
																});
																$("body").on("click",".pop-detail",function(){
																	$(this).remove();
																})
																if (is_weixin()) {
																	if (location.href.indexOf("#id=")<=0) {
																		location.href=location.href+"#mypicid="+picurl;
																	}
																	document.title="虽然好多话我不说，你就懂。但这三个字，一定要让你知道。";
																};

																setTimeout(function(){
																	$pannel.find(".arrow").show().end().find(".giftpic").addClass("animate");
																	// $pop.find(".shareimg").attr("src",finalimgsrc);
																	/*pannelEle.on('swipeup',function(ev){
																			_smq.push(['custom','Page-4','下一页']);
																			$pop.fadeIn();
																			$arrow.hide();
																			if (is_weixin()) {
																				$pop.find(".sharebtn").on("click",function(e){
																					e.preventDefault();
																					if ($pen.is(":animated")) {
																						return;
																					};
																					$light.addClass("animate");
																					$pen.addClass("animate");
																					setTimeout(function(){
																						$light.removeClass("animate");
																						$pen.removeClass("animate");	
																					},1000)
																				})
																			};

																	});*/
																	_smq.push(['custom','Page-4','下一页']);
																	$pop.show();
																	$arrow.hide();
																	if (is_weixin()) {
																		$pop.find(".sharebtn").on("click",function(e){
																			e.preventDefault();
																			if ($pen.is(":animated")) {
																				return;
																			};
																			$light.addClass("animate");
																			$pen.addClass("animate");
																			setTimeout(function(){
																				$light.removeClass("animate");
																				$pen.removeClass("animate");	
																			},1000)
																		})
																	};


																	$pop.find(".closebtn").on("click",function(){
																		$arrow.show();
																		$pop.fadeOut();
																	})
																	if (picurl) {
																		$pop.find(".sharebtn").get(0).href="http://service.weibo.com/share/share.php?title=虽然好多话我不说，你就懂。但这三个字，一定要让你知道。&url=http://xmas2015.ferrero-praline.com.cn/mshare/index.html?id="+picurl+"&source=&appkey=&pic=http://xmas2015.ferrero-praline.com.cn/m/img/share.jpg";
																		$pop.find(".giftbtn").click(function(e){
																			e.preventDefault();
																			alert("过年了，\n车，马，礼都慢， \n臻情礼盒，年后继续为你定制。");
																			return;
																			var el=this;
																			var gotourl=el.href;
																			if (gotourl) {
																				window.location.href=gotourl;
																			}else{
																				$(el).children("img").not(".btnlight").attr("src","img/giftbtn2.png");
																				$(el).unbind("click");
																				gotoCl=setInterval(function(){
																					if (el.href) {
																						clearInterval(gotoCl)
																						window.location.href=el.href;
																					};
																				},200)
																			};
																		})
																	};
																	
																},50)
															})
														}
													}
											     })
										},1000)
								})
							
								//cut
								$(".btn-file").on("change",function(e){
									$("#cutPic").show();
									var file = e.target.files[0],
										loadImage = function (file, orientation) {
								            // MegaPixImage constructor accepts File/Blob object.
								            var mpImg = new MegaPixImage(file);
								            // Create a temporary canvas
								            var canvas = document.createElement('canvas');
								            // Render resized image into canvas element
								            mpImg.onrender = function(){
								                dataURL = canvas.toDataURL('image/jpeg');//
								                gesturableImg = new ImgTouchCanvas({
								                    canvas: $("#cv")[0],
								                    path: dataURL,
								                    desktop: false
								                });
								            }
								            mpImg.render(canvas, {orientation: orientation});
								    	}
								    EXIF.getData(file, function() {
							            var orientation = 1;
							            //debugger;
							            if(this.exifdata.Orientation != undefined){
							                orientation = this.exifdata.Orientation;
							            }
							            loadImage(file, orientation);
							        });
							        $(".btn-submit").on("click",function(e){ 
								    	var src=$("#cv")[0].toDataURL();
								    	userpath=src;
								    	mycan=createCanvas($("#mycanvas"),src);
								    	$("#cutPic").hide();
								    });
								})
				});


			})
		})

}

$(function(){
	$(".music").on("click",function(e){
		var audiosrc=$("#musichide audio").get(0);
		if (audiosrc.paused) {
			audiosrc.play();
			$(".music").addClass("animate");
		}else{
			audiosrc.pause();
			$(".music").removeClass("animate");
		};
	})
	$(".skip").on("click",function(){
		label=false;
		$(".pannel1,.pannel2,.pannel3").remove();
		changeNext();		
	})
})


