GTMpushesErrorsOnformsubmit = (function () {
    var delimiter = ',';
    return {
        findErrors: function (classtype) {
            var phrases = "";

            $('.' + classtype).each(function () {
                var phrase = '';
                $(this).find('li').each(function () {
                    var current = $(this);
                    if (current.text()) {
                        if (current.children().size() > 0) { return true; }
                        phrase += current.text() + delimiter;
                    }
                });
                phrases += phrase;
            });

            return phrases;
        },
        
        findInputValidationErrors: function (classtype) {
            var phrases = "",
                elementDataValueRequired = undefined;
            

            $('.' + classtype).each(function () {
                elementDataValueRequired = $(this).data("val-required");
                if (elementDataValueRequired != undefined) {
                    phrases += $(this).data("val-required") + delimiter;
                }
            });

            return phrases;
        },

        checkFormforErrorsAfterSubmit: function (gtmFormId) {
            if (gtmFormId != "") {
                //we cannot have server side and client side errors simultaneously, so we make separate pushes.
                var serversideErrors = GTMpushesErrorsOnformsubmit.findErrors("validation-summary-errors");
                if (serversideErrors.length > 0) {
                    serversideErrors = serversideErrors.slice(0, 500);
                    dataLayer.push({ 'event': 'form errors', 'eventAction': gtmFormId, 'eventLabel': serversideErrors });
                }
                var inputValidationErrors = GTMpushesErrorsOnformsubmit.findInputValidationErrors("input-validation-error");
                var messageInformation = GTMpushesErrorsOnformsubmit.findErrors("message-Information");
                var clientSideErrors = inputValidationErrors + messageInformation;
                if (clientSideErrors.length > 0) {
                    clientSideErrors = clientSideErrors.slice(0, 500);
                    dataLayer.push({ 'event': 'form errors', 'eventAction': gtmFormId, 'eventLabel': clientSideErrors });
                }
            }
        }
    };
})($);

