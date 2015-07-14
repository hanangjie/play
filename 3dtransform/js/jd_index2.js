
$(function(){
    setTimeout(function(){
    if($(window).height()>$(".cont").height()){
        $(".ui-slider").css("padding-top",($(window).height()/$(window).width())*100+"%");
    }else{
        $(".ui-slider").css("padding-top",($(".cont").height()/$(window).width())*100+"%");
    }
    },100);
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

});
