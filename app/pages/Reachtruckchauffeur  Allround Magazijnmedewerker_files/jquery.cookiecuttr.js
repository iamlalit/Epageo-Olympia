/**
 * Copyright (C) 2012 Chris Wharton (chris@weare2ndfloor.com)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * THIS SOFTWARE AND DOCUMENTATION IS PROVIDED "AS IS," AND COPYRIGHT
 * HOLDERS MAKE NO REPRESENTATIONS OR WARRANTIES, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO, WARRANTIES OF MERCHANTABILITY OR
 * FITNESS FOR ANY PARTICULAR PURPOSE OR THAT THE USE OF THE SOFTWARE
 * OR DOCUMENTATION WILL NOT INFRINGE ANY THIRD PARTY PATENTS,
 * COPYRIGHTS, TRADEMARKS OR OTHER RIGHTS.COPYRIGHT HOLDERS WILL NOT
 * BE LIABLE FOR ANY DIRECT, INDIRECT, SPECIAL OR CONSEQUENTIAL
 * DAMAGES ARISING OUT OF ANY USE OF THE SOFTWARE OR DOCUMENTATION.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://gnu.org/licenses/>.
 
 Documentation available at http://cookiecuttr.com
 
 */
(function ($) {
    $.cookieCuttr = function (options) {
        var defaults = {
            cookieCutter: true, // you'd like to enable the div/section/span etc. hide feature? change this to true
            cookieCutterDeclineOnly: false, // you'd like the CookieCutter to only hide when someone has clicked declined set this to true
            cookieAnalytics: true, // just using a simple analytics package? change this to true
            cookieDeclineButton: true, // this will disable non essential cookies
            cookieAcceptButton: false, // this will disable non essential cookies
            cookieResetButton: false,
            cookieOverlayEnabled: false, // don't want a discreet toolbar? Fine, set this to true
            cookiePolicyLink: '/privacystatement/', // if applicable, enter the link to your privacy policy here...
            cookieMessage: '"Wij gebruiken <a href="{{cookiePolicyLink}}">cookies</a> om het gebruik van olympia.nl zo gemakkelijk mogelijk te maken',
            cookieAnalyticsMessage: 'We use cookies, just to track visits to our website, we store no personal details.',
            cookieErrorMessage: "We\'re sorry, this feature places cookies in your browser and has been disabled. <br>To continue using this functionality, please",
            cookieWhatAreTheyLink: "http://www.allaboutcookies.org/",
            cookieDisable: '',
            cookieExpires: 365,
            cookieAcceptButtonText: "ACCEPT COOKIES",
            cookieDeclineButtonText: "DECLINE COOKIES",
            cookieResetButtonText: "RESET COOKIES FOR THIS WEBSITE",
            cookieWhatAreLinkText: "What are cookies?",
            cookieNotificationLocationBottom: false, // top or bottom - they are your only options, so true for bottom, false for top            
            cookiePolicyPage: false,
            cookiePolicyPageMessage: 'Please read the information below and then choose from the following options',
            cookieDiscreetLink: false,
            cookieDiscreetReset: false,
            cookieDiscreetLinkText: "Cookies?",
            cookieDiscreetPosition: "topleft", //options: topleft, topright, bottomleft, bottomright         
            cookieNoMessage: false, // change to true hide message from all pages apart from your policy page
            cookieDomain: ""
        };
        var options = $.extend(defaults, options);
        var message = defaults.cookieMessage.replace('{{cookiePolicyLink}}', defaults.cookiePolicyLink);
        defaults.cookieMessage = 'We use cookies on this website, you can <a href="' + defaults.cookiePolicyLink + '" title="read about our cookies">read about them here</a>. To use the website as intended please...';
        //convert options
        var cookiePolicyLinkIn = options.cookiePolicyLink;
        var cookieCutter = options.cookieCutter;
        var cookieCutterDeclineOnly = options.cookieCutterDeclineOnly;
        var cookieAnalytics = options.cookieAnalytics;
        var cookieDeclineButton = options.cookieDeclineButton;
        var cookieAcceptButton = options.cookieAcceptButton;
        var cookieResetButton = options.cookieResetButton;
        var cookieOverlayEnabled = options.cookieOverlayEnabled;
        var cookiePolicyLink = options.cookiePolicyLink;
        var cookieMessage = message;
        var cookieAnalyticsMessage = options.cookieAnalyticsMessage;
        var cookieErrorMessage = options.cookieErrorMessage;
        var cookieDisable = options.cookieDisable;
        var cookieWhatAreTheyLink = options.cookieWhatAreTheyLink;
        var cookieExpires = options.cookieExpires;
        var cookieAcceptButtonText = options.cookieAcceptButtonText;
        var cookieDeclineButtonText = options.cookieDeclineButtonText;
        var cookieResetButtonText = options.cookieResetButtonText;
        var cookieWhatAreLinkText = options.cookieWhatAreLinkText;
        var cookieNotificationLocationBottom = options.cookieNotificationLocationBottom;
        var cookiePolicyPage = options.cookiePolicyPage;
        var cookiePolicyPageMessage = options.cookiePolicyPageMessage;
        var cookieDiscreetLink = options.cookieDiscreetLink;
        var cookieDiscreetReset = options.cookieDiscreetReset;
        var cookieDiscreetLinkText = options.cookieDiscreetLinkText;
        var cookieDiscreetPosition = options.cookieDiscreetPosition;
        var cookieNoMessage = options.cookieNoMessage;
        var cookieBanner = $('.cookieBanner');
        var cookieWrapper = $('.cookie-wrapper');
        // cookie identifier
        var $cookieAccepted = $.cookie('cc_cookie_accept') == "cc_cookie_accept";
        $.cookieAccepted = function () {
            return $cookieAccepted;
        };
        var $cookieDeclined = $.cookie('cc_cookie_decline') == "cc_cookie_decline";
        $.cookieDeclined = function () {
            return $cookieDeclined;
        };
        // write cookie accept button
        if (cookieAcceptButton) {
            var cookieAccept = ' <a href="#accept" class="cc-cookie-accept">' + cookieAcceptButtonText + '</a> ';
        } else {
            var cookieAccept = "";
        }
        // write cookie decline button
        if (cookieDeclineButton) {
            var cookieDecline = ' <a href="#decline" class="cc-cookie-decline">' + cookieDeclineButtonText + '</a> ';
        } else {
            var cookieDecline = "";
        }
        // write extra class for overlay
        if (cookieOverlayEnabled) {
            var cookieOverlay = 'cc-overlay';
        } else {
            var cookieOverlay = "";
        }
        // to prepend or append, that is the question?
        if ((cookieNotificationLocationBottom) || (cookieDiscreetPosition == "bottomright") || (cookieDiscreetPosition == "bottomleft")) {
            var appOrPre = true;
        } else {
            var appOrPre = false;
        }
        if (($cookieAccepted) || ($cookieDeclined)) {
            // write cookie reset button
            if ((cookieResetButton) && (cookieDiscreetReset)) {
                if (appOrPre) {
                    cookieBanner.append('<div class="cc-cookies cc-discreet"><a class="cc-cookie-reset" href="#" title="' + cookieResetButtonText + '">' + cookieResetButtonText + '</a></div>');
                } else {
                    cookieBanner.prepend('<div class="cc-cookies cc-discreet"><a class="cc-cookie-reset" href="#" title="' + cookieResetButtonText + '">' + cookieResetButtonText + '</a></div>');
                }
                //add appropriate CSS depending on position chosen
                if (cookieDiscreetPosition == "topleft") {
                    cookieWrapper.css("top", "0");
                    cookieWrapper.css("left", "0");
                }
                if (cookieDiscreetPosition == "topright") {
                    cookieWrapper.css("top", "0");
                    cookieWrapper.css("right", "0");
                }
                if (cookieDiscreetPosition == "bottomleft") {
                    cookieWrapper.css("bottom", "0");
                    cookieWrapper.css("left", "0");
                }
                if (cookieDiscreetPosition == "bottomright") {
                    cookieWrapper.css("bottom", "0");
                    cookieWrapper.css("right", "0");
                }
            } else if (cookieResetButton) {
                if (appOrPre) {
                    cookieBanner.append('<div class="cc-cookies"><a href="#" class="cc-cookie-reset">' + cookieResetButtonText + '</a></div>');
                } else {
                    cookieBanner.prepend('<div class="cc-cookies"><a href="#" class="cc-cookie-reset">' + cookieResetButtonText + '</a></div>');
                }
            } else {
                cookieResetButton = "";
            }
        } else {
            // add message to just after opening body tag
            if ((cookieNoMessage) && (!cookiePolicyPage)) {
                // show no link on any pages APART from the policy page
            } else if ((cookieDiscreetLink) && (!cookiePolicyPage)) { // show discreet link
                var htmlCookieCode = '<div class="cookie-wrapper"><div class="cc-cookies cc-discreet"><a href="' + cookiePolicyLinkIn + '" title="' + cookieDiscreetLinkText + '">' + cookieDiscreetLinkText + '</a></div></div>';
                if (appOrPre) {
                    cookieBanner.append(htmlCookieCode);
                } else {
                    cookieBanner.prepend(htmlCookieCode);
                }
                //add appropriate CSS depending on position chosen
                if (cookieDiscreetPosition == "topleft") {
                    cookieWrapper.css("top", "0");
                    cookieWrapper.css("left", "0");
                }
                if (cookieDiscreetPosition == "topright") {
                    cookieWrapper.css("top", "0");
                    cookieWrapper.css("right", "0");
                }
                if (cookieDiscreetPosition == "bottomleft") {
                    cookieWrapper.css("bottom", "0");
                    cookieWrapper.css("left", "0");
                }
                if (cookieDiscreetPosition == "bottomright") {
                    cookieWrapper.css("bottom", "0");
                    cookieWrapper.css("right", "0");
                }
            } else if (cookieAnalytics) { // show analytics overlay
                htmlCookieCode = '<div class="cookie-wrapper"><div class="cc-cookies ' + cookieOverlay + '">' + cookieAnalyticsMessage + cookieAccept + cookieDecline + '<a href="' + cookieWhatAreTheyLink + '" title="Visit All about cookies (External link)">' + cookieWhatAreLinkText + '</a></div></div>';
                if (appOrPre) {
                    cookieBanner.append(htmlCookieCode);
                    cookieBanner.show();
                    document.body.style.backgroundPosition = "0 140px";
                } else {
                    cookieBanner.prepend(htmlCookieCode);
                    cookieBanner.show();
                    document.body.style.backgroundPosition = "0 140px";
                }
            }
            if (cookiePolicyPage) { // show policy page overlay
                htmlCookieCode = '<div class="cookie-wrapper"><div class="cc-cookies ' + cookieOverlay + '">' + cookiePolicyPageMessage + " " + ' <a href="#accept" class="cc-cookie-accept">' + cookieAcceptButtonText + '</a> ' + ' <a href="#decline" class="cc-cookie-decline">' + cookieDeclineButtonText + '</a> ' + '</div></div>';
                if (appOrPre) {
                    cookieBanner.append(htmlCookieCode);
                    cookieBanner.show();
                    document.body.style.backgroundPosition = "0 140px";
                } else {
                    cookieBanner.prepend(htmlCookieCode);
                    cookieBanner.show();
                    document.body.style.backgroundPosition = "0 140px";
                }
            } else if ((!cookieAnalytics) && (!cookieDiscreetLink)) { // show privacy policy option
                htmlCookieCode = '<div class="cookie-wrapper"><div class="cc-cookies ' + cookieOverlay + '">' + cookieMessage + cookieAccept + cookieDecline + '</div></div>';
                if (appOrPre) {
                    cookieBanner.append(htmlCookieCode);
                    cookieBanner.show();
                    document.body.style.backgroundPosition = "0 140px";
                } else {
                    cookieBanner.prepend(htmlCookieCode);
                    cookieBanner.show();
                    document.body.style.backgroundPosition = "0 140px";
                }
            }
        }
        if ((cookieCutter) && (!cookieCutterDeclineOnly) && (($cookieDeclined) || (!$cookieAccepted))) {
            $(cookieDisable).html('<div class="cc-cookies-error">' + cookieErrorMessage + ' <a href="#accept" class="cc-cookie-accept">' + cookieAcceptButtonText + '</a> ' + '</div>');
        }
        if ((cookieCutter) && (cookieCutterDeclineOnly) && ($cookieDeclined)) {
            $(cookieDisable).html('<div class="cc-cookies-error">' + cookieErrorMessage + ' <a href="#accept" class="cc-cookie-accept">' + cookieAcceptButtonText + '</a> ' + '</div>');
        }
        // if bottom is true, switch div to bottom if not in discreet mode
        if ((cookieNotificationLocationBottom) && (!cookieDiscreetLink)) {
            cookieWrapper.css("top", "auto");
            cookieWrapper.css("bottom", "0");
        }
        if ((cookieNotificationLocationBottom) && (cookieDiscreetLink) && (cookiePolicyPage)) {
            cookieWrapper.css("top", "auto");
            cookieWrapper.css("bottom", "0");
        }
        // setting the cookies

        // for top bar
        $('.cc-cookie-accept, .cc-cookie-decline').click(function (e) {
            e.preventDefault();
            if ($(this).is('[href$=#decline]')) {
                $.cookie("cc_cookie_accept", null, {
                    path: '/'
                });
                $.cookie("cc_cookie_decline", "cc_cookie_decline", {
                    expires: cookieExpires,
                    path: '/'
                });
                if (options.cookieDomain) {
                    // kill google analytics cookies
                    $.cookie("__utma", null, {
                        domain: '.' + options.cookieDomain,
                        path: '/'
                    });
                    $.cookie("__utmb", null, {
                        domain: '.' + options.cookieDomain,
                        path: '/'
                    });
                    $.cookie("__utmc", null, {
                        domain: '.' + options.cookieDomain,
                        path: '/'
                    });
                    $.cookie("__utmz", null, {
                        domain: '.' + options.cookieDomain,
                        path: '/'
                    });
                }
            } else {
                $.cookie("cc_cookie_decline", null, {
                    path: '/'
                });
                $.cookie("cc_cookie_accept", "cc_cookie_accept", {
                    expires: cookieExpires,
                    path: '/'
                });
            }
            $(".cc-cookies, .cookie-wrapper").fadeOut(function () {
                // reload page to activate cookies
                cookieBanner.slideUp();
                document.body.style.backgroundPosition = "0 115px";
            });
        });
        //reset cookies
        $('a.cc-cookie-reset').click(function (f) {
            f.preventDefault();
            $.cookie("cc_cookie_accept", null, {
                path: '/'
            });
            $.cookie("cc_cookie_decline", null, {
                path: '/'
            });
            $(".cc-cookies, .cookie-wrapper").fadeOut(function () {
                // reload page to activate cookies
                cookieBanner.slideUp();
                document.body.style.backgroundPosition = "0 115px";
            });
        });
        //cookie error accept
        $('.cc-cookies-error a.cc-cookie-accept').click(function (g) {
            g.preventDefault();
            $.cookie("cc_cookie_accept", "cc_cookie_accept", {
                expires: cookieExpires,
                path: '/'
            });
            $.cookie("cc_cookie_decline", null, {
                path: '/'
            });
            // reload page to activate cookies
            cookieBanner.fadeOut();
            document.body.style.backgroundPosition = "0 115px";
        });
    };
})(jQuery);