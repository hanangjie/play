//弹出相册
function albumShow(){
	//计算高度
	var bodyHei=$(window).height()
		,$m_albums=$("#m_albums")	
		,sub_navHei=$m_albums.find(".sub_nav").height()
		,pageHei=$m_albums.find(".page").height()
		,box_margin=30
		,box_height=bodyHei*0.86
		,imgListWid=$m_albums.find(".img_list_Img li").width()
		,imgListBoxWid=$m_albums.find(".img_list").width()
		,$turnL=$m_albums.find(".turnL")
		,$turnR=$m_albums.find(".turnR")
		,$subturnL=$m_albums.find(".subTurnL")
		,$subturnR=$m_albums.find(".subTurnR")
		,$imgList=$m_albums.find(".img_list_Img img")
		,$imgLi=$m_albums.find(".img_list_Img li")
		,imgListLength=$imgList.length
		,subTime=Math.floor((imgListWid*imgListLength)/imgListBoxWid)
		;
	$m_albums.show();
	$m_albums.find(".albums_bg").height(bodyHei);
	$m_albums.find(".albums_box").css({"height":box_height,"margin-top":bodyHei*0.07});
	$m_albums.find(".imgshow").css({"height":box_height-sub_navHei-pageHei-box_margin});
	$m_albums.find(".turnL").css({"height":box_height-sub_navHei-pageHei-box_margin});
	$m_albums.find(".turnR").css({"height":box_height-sub_navHei-pageHei-box_margin});
	//让图片居中
	$m_albums.find(".imgshow_box").css({"margin-top":($m_albums.find(".imgshow").height()-$m_albums.find(".img").height())/2});
	
	$m_albums.find(".img_list_Img").css({width:imgListLength*imgListWid});
	
	//点击事件
	$imgLi.click(function(){
		var rel=$(this).index();
		img_change(rel);
	});
	//关闭
	$m_albums.find(".clos").click(function(){
		$m_albums.hide();
	});
	
	//添加事件
	$turnL.click(function(){
		var rel=$m_albums.find(".img_list_Img li.on").index();
		rel=rel==0?0:rel-1;
		img_change(rel);
	});
	$turnR.click(function(){
		var rel=$m_albums.find(".img_list_Img li.on").index();
		rel=rel==(imgListLength-1)?rel:rel+1;
		img_change(rel);
	});
	
	//底部导航事件
	$subturnL.click(function(){
		if(parseInt($m_albums.find(".img_list_Img").css("left"))<0){
			if((-parseInt($m_albums.find(".img_list_Img").css("left")))<parseInt($m_albums.find(".img_list").width())){
				$m_albums.find(".img_list_Img").animate({"left":0},500);
			}else{
				$m_albums.find(".img_list_Img").animate({"left":parseInt($m_albums.find(".img_list_Img").css("left"))+$m_albums.find(".img_list").width()},500);
			}
		}
	});
	
	$subturnR.click(function(){
		if(  parseInt($m_albums.find(".img_list_Img").css("left"))  >  (parseInt($m_albums.find(".img_list").width())-$m_albums.find(".img_list_Img").width())  ){
			if(parseInt($m_albums.find(".img_list_Img").css("left")) + $m_albums.find(".img_list_Img").width() <= $m_albums.find(".img_list").width() ){
				$m_albums.find(".img_list_Img").animate({"left":-(parseInt($m_albums.find(".img_list").width())-$m_albums.find(".img_list_Img").width()) },500);
			}else{
				$m_albums.find(".img_list_Img").animate({"left":parseInt($m_albums.find(".img_list_Img").css("left"))-$m_albums.find(".img_list").width()+imgListWid},500);
			}
		}
	});
	
	function img_change(rel){
		$m_albums.find(".imgshow_box .img").css("height","auto");
		var src=$m_albums.find(".img_list_Img li").eq(rel).find(".img").attr("src");
		$m_albums.find(".img_list_Img li").removeClass("on").eq(rel).addClass("on");
		$m_albums.find(".img_list_Img").animate({left:-rel*imgListWid},300);
		$m_albums.find(".imgshow_box .img").attr("src",src);
		$m_albums.find(".page i").html(rel+1);
		if($m_albums.find(".imgshow_box .img").height()>$m_albums.find(".imgshow").height()){
			$m_albums.find(".imgshow_box .img").height($m_albums.find(".imgshow").height());
		}else{
			
		}
		$m_albums.find(".title").css({"width":$m_albums.find(".imgshow_box .img").width()});
		$m_albums.find(".imgshow_box").css({"margin-top":($m_albums.find(".imgshow").height()-$m_albums.find(".img").height())/2});
	}
}