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

    if(listBox.length>1){
        var obj = document.getElementById('list');
        var startX= 0,left= 0,right=true,touch=0;
        obj.addEventListener('touchstart', function(event) {
            event.preventDefault();
            if (event.targetTouches.length == 1) {
                var touch = event.targetTouches[0];
                startX=touch.pageX;
                left=parseInt(obj.style.left);
            }
        }, false);
        obj.addEventListener('touchmove', function(event) {
            event.preventDefault();
            if (event.targetTouches.length == 1) {
                var touch = event.targetTouches[0];
                obj.style.left = left+touch.pageX-startX + 'px';

            }
        }, false);
        obj.addEventListener('touchend', function(event) { event.preventDefault();


            var index=parseInt(event.target.attributes["rel"].value)
                ,titleHtml=""
                ;

            if(left<parseInt(obj.style.left)){
                if(index>0){
                    $(this).animate({left:-winWidth*(--index)},100);
                }else{
                    $(this).animate({left:0},100);
                }
            }else{
                if(index<(listBox.length-1)){
                    $(this).animate({left:-winWidth*(++index)},100);
                }else{
                    $(this).animate({left:-winWidth*index},100);
                }
            }
            $(".tabList li").removeClass("on").eq(index).addClass("on");
            $(".title p").html(listImg.eq(index).attr("title"));
        }, false);

    }
});

function imgResize(obj){
    var winHeight=$(window).height()
        ,winWidth=$(window).width()
        ,bil=obj.width/obj.height
    ;

    if(obj.height>winHeight){
        obj.height=winHeight;
        obj.style.width=bil*winHeight+"px";
    }else{
        obj.style.marginTop=((winHeight-obj.height)/2)+"px";
    }
}