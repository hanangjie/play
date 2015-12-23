$(function(){
	$("#hotel_img .picR .pic").hover(function(){
		$(this).parent().find(".textTm").show();
	},function(){
		$(this).parent().find(".textTm").hide();
	});
	//图片浮动
	ply.imgFloat($("#hotel_img .pic"));
	
	//中部导航
	var subNavhei=$("#m_subNav").height();
	var $subNavA=$("#m_subNav .nav a");
	var oldsubNavAOn=0;
	$subNavA.each(function(i){
		$(this).click(function(){
			var id=$(this).attr("rel")
			,hei=$("#"+id).offset().top
			;
			$(window).scrollTop(hei-subNavhei);
			
			$subNavA.removeClass("on").eq(i).addClass("on");
			$("#subNav_bg").stop().animate({left:i*113},300);
			oldsubNavAOn=i;
		});
		
		$(this).hover(function(){
				$subNavA.removeClass("on");
				$("#subNav_bg").stop().animate({left:i*113},200);
				$subNavA.eq(i).addClass("on");
		},function(){
				$subNavA.removeClass("on");
				$("#subNav_bg").stop().animate({left:oldsubNavAOn*113},200);
					$subNavA.eq(oldsubNavAOn).addClass("on");
		});
	});
	
	
	//中部导航浏览记录跟随
	var subNavTop=$("#m_subNav").offset().top;
	$(window).scroll(function(){
		//回顶部按钮
		if($(window).scrollTop()>subNavTop){
			$("#m_subNav").css({"top":0,"position":"fixed"});
			//回顶部按钮
			$(".g_totop").show();
		}else{
			$("#m_subNav").css({"top":0,"position":"absolute"});
			//回顶部按钮
			$(".g_totop").hide();
		}
		for(var i=0,l=$subNavA.length;i<(l-1);i++){
				var id=$subNavA.eq(i).attr("rel")
					,hei=$("#"+id).offset().top
					;
				if($(window).scrollTop()>=(hei-subNavhei)){
					$subNavA.removeClass("on");
					$("#subNav_bg").stop().animate({left:i*113},200);
					$subNavA.eq(i).addClass("on");
					oldsubNavAOn=i;
				}else{
					break;
				}
			}
	});
	
	
	//查看房型具体信息
	$(".tr .de").click(function(){
		if($(this).attr("class").indexOf("de_on")!=-1){
			$(this).removeClass("de_on").closest(".tr").find(".tr_de").hide();
		}else{
			$(this).addClass("de_on").closest(".tr").find(".tr_de").show();
		}
	});
	
	//查看房型鼠标滑动效果
	$(".tr .hs_word").hover(function(){
		$(this).addClass("hs_word_on");
	},function(){
		$(this).removeClass("hs_word_on");});
		
	//弹出相册
	
	$("#hotel_img .pic").click(function(){
		albumShow();
	});
});

