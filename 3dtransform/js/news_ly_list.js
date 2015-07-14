$(function(){
    $(".tabList").width($(".tab").length*107);
    if( $(".tabList").width()>$(window).width()){
        var obj = document.getElementById('tabList');
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
            }else if(parseInt(obj.style.left)<($(window).width()-$(".tabList").width()-50)){
                $(this).animate({left:($(window).width()-$(".tabList").width()-50)},100);
            }
        }, false);

    }
});