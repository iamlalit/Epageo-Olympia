var googleAnalyticsCookie = (function ($) {
    var googleCookie = typeof ga,
        clientIdSelector = "#clientId";

    function initializeGaCookieIfNotExist() {
        if (googleCookie === 'undefined') {
            (function (i, s, o, g, r, a, m) {
                i['GoogleAnalyticsObject'] = r;
                i[r] = i[r] || function () {
                    (i[r].q = i[r].q || []).push(arguments)
                }, i[r].l = 1 * new Date();
                a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
                a.async = 1;
                a.src = g;
                m.parentNode.insertBefore(a, m);
            })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
        }
    }

    function getClientId() {
        ga('create', 'UA-XXXX-Y', 'auto');
        ga(function (tracker) {
            var clientId = tracker.get('clientId');
            $(clientIdSelector).val(clientId);
        });
    }

    return {
        init: function () {
            initializeGaCookieIfNotExist();
            getClientId();
        }
    };
}($));

googleAnalyticsCookie.init();