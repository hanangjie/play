$(function(){

    $("body").css("height",$(window).height());
    $(".g-bd").css("height",$(window).height());
    $(".begin").css("height",$(window).height());
    setTimeout(function(){
        $(".begin").fadeOut(1000);
    },1500);

    (function(){

        var slider = new fz.Scroll('.ui-slider', {
            role: 'slider',
            indicator: true,
            autoplay: true,
            interval: 3000
        });

        slider.on('beforeScrollStart', function(from, to) {
            console.log(from, to);
        });

        /*slider.on('scrollEnd', function(cruPage) {
         console.log(curPage);
         });*/

    })();
    var loadingT;
    var loadingLabel=$(".loading .i label");
    $(".g-bd").scroll(function(){
        if($(".g-bd").scrollTop()>=($(".g-bd").height()-$(window).height())){
            //发送请求
            $.ajax({


            });
        }
    });

    $(".home").tap(function(){
        if($(this).attr("click")=="true"){
            $(".tool_bg").addClass("tool_bgon");
            $(".tool .icon").each(function(i,e){
                $(this).show();
               //$(this).animate({"top":"20px"},1000000);
                anima($(this),{left:$(this).attr("left"),top:$(this).attr("top")},10);
            });
            $(this).attr("click",false);
        }else{
            $(".tool .icon").css({left:"0px",top:"0px"}).hide();
            $(".tool_bg").removeClass("tool_bgon");
            $(this).attr("click",true);
        }
    });

    $(".tool_bg").tap(function(){
        $(".tool .icon").css({left:"0px",top:"0px"}).hide();
        $(".tool_bg").removeClass("tool_bgon");
        $(".home").attr("click",true);
    });

});

function anima(obj,option,speed){
    var q=10,i=0;
    for(x in option){
        option[x]=option[x]/10;
    }

    function set() {
        setTimeout(function () {
            for (x in option) {
                obj.css(x, option[x] + parseFloat(obj.css(x)));
            }
            i++;
            console.log(i);
            if (i < q) {
                set();
            }
        }, speed);
    }
    set();
}