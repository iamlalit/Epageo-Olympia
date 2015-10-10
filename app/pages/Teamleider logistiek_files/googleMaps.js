GoogleMapsManager = (function ($) {
    return {
        resizeImage: function () {
            var newSize = "size=" + Math.round($(".col3-wrap .col").width()) + "x" + Math.round($(".col3-wrap .col .box").height());
            var googleMapsImg = $("img[src*='maps.google.com']");
            googleMapsImg.attr("src", googleMapsImg.attr("src").replace(new RegExp("size=(\\d)*x(\\d)*"), newSize));
        }
    };
})($);