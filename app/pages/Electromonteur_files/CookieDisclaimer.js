$(document).ready(function () {
    var cookieDisclaimer = '#cookieDisclaimer';

    $.cookieCuttr({
        cookieAnalytics: false,
        cookieNotificationLocationBottom : false,
        cookieDeclineButtonText: $(cookieDisclaimer).data('decline-button-text'),
        cookieMessage: $(cookieDisclaimer).data('cookie-message'),
        cookiePolicyLink: 'privacystatement'
    });
});