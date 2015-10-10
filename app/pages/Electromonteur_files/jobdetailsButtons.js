JobDetailsButtons = (function ($) {
    var initButtonClass = ".shareButton";

    return {
        init: function () {
            $(initButtonClass).mouseover(this.handleMouseOverEvent);
            $(initButtonClass).mouseout(this.handleMouseOutEvent);
            $(window).load(function() {
                $('.shareButton.facebook').children('div.facebookLike').hide();
            });
        },
        handleMouseOverEvent: function (e) {            
            $(this).children("div").eq(0).hide();
            if ($(this).children("div").eq(1).css("visibility") != "visible")
                $(this).children("div").eq(1).css("visibility", "visible");
            $(this).children("div").eq(1).show();
        },
        handleMouseOutEvent: function (e) {
            $(this).children("div").eq(1).hide();
            $(this).children("div").eq(0).show();
        }
    };
})($);

$(function () {    
    JobDetailsButtons.init();       
});

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";//Could add FB AppId here
    fjs.parentNode.insertBefore(js, fjs);
} (document, 'script', 'facebook-jssdk'));