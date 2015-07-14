$(function(){
    //下表闪烁
    setInterval(function(){
            $(".imgCont label").fadeIn(500,function(){
                $(".imgCont label").fadeOut(500);
            });
    },1500);

    $(".wordBox").height( $(".wordBox").height()-100);

    //3d翻滚
    var winHeight=$(window).height();
    var obj = document.getElementById('contral');
    var startY= 0,left= 0,endY,lastY,moveEq;

    //配置imgList参数
    var contral=$("#contral")
        ,imgCont=$(".imgCont")
        ,contraleq=0
        ,animated=true
        ;
    contral.attr({"len":imgCont.length});

    obj.addEventListener('touchstart', function(event) {
        event.preventDefault();
        if (event.targetTouches.length == 1) {
            var touch = event.targetTouches[0];

            startY=touch.pageY;
        }
    }, false);
    obj.addEventListener('touchmove', function(event) {
        event.preventDefault();
        if (event.targetTouches.length == 1&&animated) {
            var touch = event.targetTouches[0];
            endY=touch.pageY;
            lastY=startY-endY;
            //获取当前的eq
            moveEq=parseInt(contral.attr("eq"));
            if(startY>endY) {
                //alert("down to up");
                contraleq=(moveEq+1)==parseInt(contral.attr("len"))?0:(moveEq+1);
                imgCont.eq(contraleq).css({"display":"inline","-webkit-transform": 'rotateX(' + (parseInt(90 * lastY / winHeight)-90) + 'deg) translateY(' + ((-lastY / 2)+winHeight/2) + 'px) translateZ(' +Math.abs(Math.abs(lastY) / 2-winHeight/2)+ 'px)'});

            }else{
                //alert("up to down");
                contraleq=moveEq==0?(parseInt(contral.attr("len"))-1):(moveEq-1);
                imgCont.eq(contraleq).css({"display":"inline","-webkit-transform": 'rotateX(' + (parseInt(90 * lastY / winHeight)+90) + 'deg) translateY(' + ((-lastY / 2)-winHeight/2) + 'px) translateZ(' +Math.abs(Math.abs(lastY) / 2-winHeight/2)+ 'px)'});
            }
            imgCont.eq(moveEq).css({"display":"inline","-webkit-transform": 'rotateX(' + parseInt(90 * lastY / winHeight) + 'deg) translateY(' + (-lastY / 2) + 'px) translateZ(' + Math.abs(lastY) / 2 + 'px)'});

        }
    }, false);
    obj.addEventListener('touchend', function(event) { event.preventDefault();
        if(animated){
            animated=false;
        }else{
            return;
        }
        if(startY>endY){
            //alert("down to up");
            imgCont.eq(moveEq).animate({"-webkit-transform":'rotateX(90deg) translateY(-'+winHeight/2+'px) translateZ('+winHeight/2+'px)',"z-index":0},500);
            imgCont.eq(contraleq).animate({"-webkit-transform":'rotateX(0deg) translateY(0px) translateZ(0px)',"z-index":1},500,function(){
                $(".imgCont").eq(moveEq).css({"display":"none"});
                animated=true;
            });
            contral.attr("eq",contraleq);
        }else{
            //alert("up to down");
            imgCont.eq(moveEq).animate({"-webkit-transform":'rotateX(-90deg) translateY('+winHeight/2+'px) translateZ('+winHeight/2+'px)',"z-index":0},500);
            imgCont.eq(contraleq).animate({"-webkit-transform":'rotateX(0deg) translateY(0px) translateZ(0px)',"z-index":1},500,function(){
                $(".imgCont").eq(moveEq).css({"display":"none"});
                animated=true;
            });
           contral.attr("eq",contraleq);
        }
    }, false);

});