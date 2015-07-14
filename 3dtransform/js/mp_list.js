$(function(){
    $(".text").tap(function(){
        $(this).hide().parent().find("input").focus();
    });
    $(".search input").blur(function(){
        $(".text").show();
    });

});
