alert(1312);
$(function(){

    var list=$(".list")
        ,listImg= list.find("img")
        ,listBox= list.find(".listBox")
        ;
    var winHeight=$(window).height()
        ,winWidth=$(window).width()
        ,imgLenth=listImg.length
        ;
    var Lihtml="";
    list.width(imgLenth*winWidth);
    listBox.each(function(i,e){
        $(this).height(winHeight).width(winWidth);
        if(i==0){
         Lihtml+='<li class="on">&nbsp;</li>';
        }else{
            Lihtml+='<li>&nbsp;</li>';
        }
    });
    $(".title p").html(listImg.eq(0).attr("title"));
    $(".tabList").html(Lihtml);

    //触控操作
    if(listBox.length>1){
        var obj = document.getElementById('list');
        var startX= 0
            ,startY=0
            ,left= 0//滑动前位移距离
            ,touch= 0
            ,touchT=0
            ,index=0//当前移动index
            ,startLenth=0//初始的两点距离
            ,oldWidth=0//触屏前尺寸
            ,oldHeight=0
            ,touchNum=0//触控点个数
            ,nowWidth=0//触屏放大时的宽度
            ,moveImg=false//是否放大
            ,transX=0//单点放大查看位移
            ,transY=0//单点放大查看位移
            ,imgX=0
            ,imgY=0//图片移动
            ;
        obj.addEventListener('touchstart', function(event) {
            event.preventDefault();
            if (event.targetTouches.length == 1) {
                //单点滑动
                touch = event.targetTouches[0];
                startX=touch.pageX;
                startY=touch.pageY;
                left=parseInt($(this).attr("laft"));
                touchNum=1;
            }else if (event.targetTouches.length >1) {
                //多点放大
                touch = event.targetTouches[0];
                touchT = event.targetTouches[1];
                startX=touch.pageX;
                startLenth=Math.abs(touchT.pageX-touch.pageX);
                oldWidth=parseInt($(this).find("img").eq(index).attr("oldw"));
                oldHeight=parseInt($(this).find("img").eq(index).attr("oldh"));
                nowWidth=$(this).find("img").eq(index).width();
                touchNum=2;
            }
            if(moveImg){
                transX=parseInt($(this).find("img").eq(index).attr("transX"));
                transY=parseInt($(this).find("img").eq(index).attr("transY"));
            }
        }, false);
        obj.addEventListener('touchmove', function(event) {
            event.preventDefault();
            index=parseInt(event.currentTarget.attributes["rel"].value);
            touch = event.targetTouches[0];
            if (touchNum == 1) {
                if(moveImg){
                        //限制图片移动的左右位移
                        if((transX+touch.pageX-startX)>=0){
                            imgX=0;
                        }else{
                            if(Math.abs(transX+touch.pageX-startX)<Math.abs(winWidth- $(this).find("img").eq(index).width())){
                                imgX=transX+touch.pageX-startX;
                            }else{
                                imgX=-Math.abs(winWidth- $(this).find("img").eq(index).width());
                            }
                        }
                        //限制图片移动的上下位移
                        if((transY+touch.pageY-startY)>0){
                            imgY=0;
                        }else{
                            if(Math.abs(transY+touch.pageY-startY)<(Math.abs($(this).find("img").eq(index).height()-winHeight))) {
                                imgY=transY+touch.pageY-startY;
                            }else{
                                imgY=-Math.abs($(this).find("img").eq(index).height()-winHeight);
                            }
                        }
                        /*if($(this).find("img").eq(index).height()<winHeight){
                            $(this).find("img").eq(index).css({"-webkit-transform":"translateX("+imgX+"px)"})
                                .attr({"transX":imgX
                            });
                        }else{*/
                            $(this).find("img").eq(index).css({"-webkit-transform":"translateX("+imgX+"px) translateY("+imgY+"px)"})
                                .attr({"transX":imgX,
                                    "transY":imgY
                                });
                        //}
                        //更改位移属性值
                    return;

                }
                $(this).css({"-webkit-transform":"translate("+(left+touch.pageX-startX)+"px, 0px) translateZ(0px)"}).attr("laft",(left+touch.pageX-startX));

            }else if (touchNum > 1){
                //多点触动
                touchT = event.targetTouches[1];
                var length=Math.abs(touchT.pageX-touch.pageX);
                if($(this).find("img").eq(index).attr("can")=="true"){
                    if(length>startLenth){
                        //放大
                        if((nowWidth+Math.abs(length-startLenth))<=$(this).find("img").eq(index).attr("w")){
                            $(this).find("img").eq(index).css({"height":"auto",
                                "width":(nowWidth+Math.abs(length-startLenth))+"px"
                                //,-webkit-transform":"translateX(-"+Math.abs(touch.pageX-touchT.pageX)+"px) translateY(-"+Math.abs(touch.pageY-touchT.pageY)+"px)"
                                },
                                100);
                           // $("#num").html("q="+Math.abs(touch.pageX-touchT.pageX));
                        }
                        moveImg=true;
                    }else{
                        //缩小
                        $(this).find("img").eq(index).css({
                            "height": "auto",
                            "width": (oldWidth - Math.abs(length - startLenth)) + "px",
                            "-webkit-transform":"translateX(0px) translateY(0px)"
                        }, 100).attr({"transX":0,
                            "transY":0
                        });

                        moveImg=false;
                    }
                }
            }

        }, false);
        obj.addEventListener('touchend', function(event) { event.preventDefault();

            if (touchNum> 1){
                if($(this).find("img").eq(index).width()<=oldWidth){
                    $(this).find("img").eq(index).animate({
                       // "height": oldHeight+"px",
                        "width": oldWidth + "px"
                    }, 100);
                }
                return;
            }

            if(moveImg){
                if(Math.abs(left-parseInt($(this).attr("laft")))<200){
                    $(this).animate({"-webkit-transform":"translate("+(-winWidth*index)+"px, 0px) translateZ(0px)"},100).attr("laft",(-winWidth*(index)));
                    return;
                }
            }else{
                if(Math.abs(left-parseInt($(this).attr("laft")))<80){
                    $(this).animate({"-webkit-transform":"translate("+(-winWidth*index)+"px, 0px) translateZ(0px)"},100).attr("laft",(-winWidth*(index)));
                    return;
                }
            }
            if(left<parseInt($(this).attr("laft"))){
                if(index>0){
                    $(this).animate({"-webkit-transform":"translate("+(-winWidth*(--index))+"px, 0px) translateZ(0px)"},100).attr("laft",(-winWidth*(index)));
                }else{
                    $(this).animate({"-webkit-transform":"translate(0px, 0px) translateZ(0px)"},100).attr("laft",0);
                }
            }else{
                if(index<(listBox.length-1)){
                    $(this).animate({"-webkit-transform":"translate("+(-winWidth*(++index))+"px, 0px) translateZ(0px)"},100).attr("laft",(-winWidth*(index)));
                }else{
                    $(this).animate({"-webkit-transform":"translate("+(-winWidth*(index))+"px, 0px) translateZ(0px)"},100).attr("laft",(-winWidth*(index)));
                }
            }
            event.currentTarget.attributes["rel"].value=index;
            $(".tabList li").removeClass("on").eq(index).addClass("on");
            $(".title p").html(listImg.eq(index).attr("title"));
        }, false);

    }

    //双击放大图片
    var doubleClick=0;
    $("img").tap(function(){
        var that=$(this);
        doubleClick++;
        setTimeout(function(){
            doubleClick=0;
        },500);
        if(doubleClick==2&&that.attr("can")=="true"){
            if(!moveImg){
                that.css("height","auto").animate({"width":that.attr("w")+"px"},100);
                moveImg=true;
            }else{
                that.css({"height": "auto"}).animate({
                    "width": parseInt(that.attr("oldw"))+ "px",
                    "-webkit-transform":"translateX(0px) translateY(0px)"
                },150).attr({"transX":0,
                    "transY":0
                });

                moveImg=false;
            }
        }
    });
});

function imgResize(obj){
    var winHeight=$(window).height()
        ,winWidth=$(window).width()
        ,bil=obj.width/obj.height
        ;
    obj.setAttribute("h",obj.height);
    obj.setAttribute("w",obj.width);
    if(obj.width>winWidth){
        obj.style.width=winWidth+"px";
        obj.setAttribute("can","true");
    }
    if(obj.height>winHeight){
        obj.style.height=winHeight+"px";
        obj.style.width=bil*winHeight+"px";
        obj.setAttribute("can","true");
    }
    obj.setAttribute("oldh",obj.height);
    obj.setAttribute("oldw",obj.width);
    //放大查看属性
    obj.setAttribute("transX",0);
    obj.setAttribute("transY",0);

    obj.style.marginTop=((winHeight-obj.height)/2)+"px";
}