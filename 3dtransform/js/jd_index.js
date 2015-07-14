$(function(){

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
