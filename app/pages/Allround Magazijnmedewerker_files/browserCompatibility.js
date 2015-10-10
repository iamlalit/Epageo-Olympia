var CookieHelper = (function () {
    return {
        getCookie: function (name) {
            var nameEq = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEq) == 0) return c.substring(nameEq.length, c.length);
            }
            return null;
        },

        setCookie: function (name, value) {
            document.cookie = name + "=" + value + "; path=/";
        }
    };
})();

$(document).ready(function () {
    
    //Disable multiple submits
    $('form.disable-double-submission').submit(function () {
        $(':submit', this).click(function () {
            this.disabled = true;
            return true;
        });
    });

    var version = parseFloat($.browser.version);
    if ($.browser.msie && document.documentMode >= 8 || version >= 8.0) {
        if (document.documentMode == 8) {
            //Apply rounded corners
            $('.box, .meta, .featureSlider, .menu-main > li, .menu-main > li > a').each(function () {
                PIE.attach(this);
            });
        }
        return;
    }

    if ($.browser.mozilla && version >= 11.0) {
        return;
    }
    if ($.browser.webkit && version >= 533.16) {
        //Both Safari and Chrome uses the same webkit framework. (Safari 5.0 = webkit 533.16)
        return;
    }
    if (!CookieHelper.getCookie("userAcknowledged")) {
        if (confirm("Your browser in not supported by Olympia. You may experience some graphical glitches. \n \n Press OK to don't show this message again.")) {
            CookieHelper.setCookie('userAcknowledged', true);
        }
    }
});

