$(function(){
    var searchBtn= $("#shaixuan");
    $(".text").tap(function(){
        $(this).hide().parent().find("input").focus();
        searchBtn.html("取消");
        $(".cont").eq(0).hide();
    });
    searchBtn.tap(function(){
        if($(this).html().indexOf("筛选")!=-1) {
            $(".search,.cont").hide();
            $(".filter").show();
        }else{
            $(".text").show();
            searchBtn.html("筛选");
            $(".cont").eq(0).show();
        }
    });

    /*筛选页面功能点**************************************************************************************************/
    //计算景区类型长度
    $(".type").width(85*$(".type li").length);
    if( $(".type").width()>$(window).width()){
        var obj = document.getElementById('type');
        var startX= 0,left=0;
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

                if(parseInt(obj.style.left)>0){
                    $(this).animate({left:0},100);
                }else if(parseInt(obj.style.left)<($(window).width()-$(".type").width()-50)){
                    $(this).animate({left:($(window).width()-$(".type").width()-50)},100);
                }
        }, false);

    }

    $("#location").tap(function(){
        $(".allArea").toggle();
        $("#location").toggleClass("on");
    });
    $(".type li").tap(function(){
        $(this).closest(".type").find("li").removeClass("on");
        $(this).addClass("on")
    });
    $(".grade span").tap(function(){
        $(this).closest(".grade").find("span").removeClass("on");
        $(this).addClass("on")
    });
    $(".cList span").tap(function(){
        $(this).closest(".cList").find("span").removeClass("on");
        $(this).addClass("on")
    });
/*取消和确定*/
    $(".btnList span").tap(function(){
        $(".filter").hide();
        var that=$(this);
        that.addClass("on");
        setTimeout(function(){
            $(".search,.cont").show();
            that.removeClass("on");
        },500);
    });
});
