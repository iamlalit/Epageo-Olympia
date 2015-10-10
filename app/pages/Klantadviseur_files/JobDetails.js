JobDetailsView = (function () {

    var checkBoxesClass = ".spotlightJobLink",
        removeSpotlightJobDataAttribute = "removeSpotlightUrl",
        addSpotlightJobDataAttribute = "addSpotlightUrl",
        isSpotlightDataAttribute = "isSpotlight",
        printButtonClass = ".printJobButtons",
        printAreaIdDataAttribute = "areaToPrint",
	    previewAreaIdDataAttribute = "areaToPreview",
        spotlightIconSelector = ".spotlightJobIcon",
        checkedClass = "checkbox-checked",
        uncheckedClass = "checkbox-unchecked",
        antiforgeryToken = "",
	    printButtonIdDataAttribute = "printButton",
	    cancelButtonIdDataAttribute = "cancelButton",
        entryFormJobOpenSelector = ".job-entry-form-opener",
        contactUrlJobSourceDataAttribute = "urlJobSource",
        jobIdDataAttribute = "jobId",
        popupDialogTitle = "Stel een vraag",
        contactFormMinWidth = 550,
        contactFormMinHeight = 600,
        contactOfficeEmailSubmitButtonSelector = "#contactOfficeEmailSubmit",
        contactOfficeEmailFormSelector = "#contactOfficeEmailForm",
        contactEmailSentMessageSelector = "#contactEmailSent",
        delimiter = ',';

    return {
        init: function () {
            var areaId = $(this).data(printAreaIdDataAttribute);
            $("#" + areaId).dialog({ autoOpen: false });
            $(checkBoxesClass).click(this.onButtonClick);
            $(printButtonClass).click(this.onPrintButtonClick);
            antiforgeryToken = $('input[name=__RequestVerificationToken]').val();
            $(entryFormJobOpenSelector).click(this.onNewEntryClick);
            $(document).delegate(contactOfficeEmailSubmitButtonSelector, "click", JobDetailsView.submit);
        },
        onButtonClick: function () {
            var button = $(this);
            var isSpotlight = (button.data(isSpotlightDataAttribute) == "True");
            var urlDataAttribute = isSpotlight ? removeSpotlightJobDataAttribute : addSpotlightJobDataAttribute;
            var url = button.data(urlDataAttribute);

            JobDetailsView.sendRequest(url);
        },
        onPrintButtonClick: function (e) {
            var previewAreaId = $(this).data(previewAreaIdDataAttribute);
            var printAreaId = $(this).data(printAreaIdDataAttribute);
            var printButtonId = $(this).data(printButtonIdDataAttribute);
            var cancelButtonId = $(this).data(cancelButtonIdDataAttribute);
            JobDetailsView.OpenDialog = $("#" + previewAreaId).dialog({
                autoOpen: true,
                modal: true,
                resizable: false,
                autoResize: false,
                width: 750,
                height: 650,
                title: $(this).data("title"),
                dialogClass: 'alert',
                create: function () {
                    $("#" + printButtonId).click(function () {
                        JobDetailsView.print(printAreaId);
                    });
                    $("#" + cancelButtonId).click(function () {
                        $("#" + previewAreaId).dialog("close");
                    });
                }
            });
            $("#" + previewAreaId + " a").click(function (e) {
                e.preventDefault();
            });
        },
        sendRequest: function (url) {
            $.ajax({
                type: "POST",
                url: url,
                cache: false,
                dataType: "json",
                data: {
                    __RequestVerificationToken: antiforgeryToken
                }
            }).done(function (json) {
                JobDetailsView.onAjaxDone(json.IsSpotlight);
            });
        },
        onAjaxDone: function (isSpotlight) {
            $(checkBoxesClass).data(isSpotlightDataAttribute, isSpotlight ? "True" : "False");
            if (isSpotlight) {
                $(checkBoxesClass).removeClass("hollow").addClass("orange");
                $(spotlightIconSelector).addClass(checkedClass).removeClass(uncheckedClass);
            } else {
                $(checkBoxesClass).removeClass("orange").addClass("hollow");
                $(spotlightIconSelector).addClass(uncheckedClass).removeClass(checkedClass);
            }

        },
        print: function (areaId) {
            var documentContainer = $("#" + areaId);
            documentContainer.printElement();
            JobDetailsView.OpenDialog.dialog("close");
        },
        onNewEntryClick: function (event) {
            var url = $(this).data(contactUrlJobSourceDataAttribute) + '?jobId=' + $(this).data(jobIdDataAttribute);
            popupDialogTitle = $(this).data("title");
            
            console.log("opened");
            dataLayer.push({ 'event': 'overlay popup', 'eventAction': 'opened', 'eventLabel': 'message' });

            $.ajax({
                url: url,
                dataType: "html"
            }).done(JobDetailsView.displayDialogForHtml);
            event.preventDefault();
        },
        getDialogOptions: function () {
            return {
                modal: true,
                autoOpen: true,
                minWidth: contactFormMinWidth,
                minHeight: contactFormMinHeight,
                closeOnEscape: true,
                resizable: false,
                title: popupDialogTitle,
                close: function(event) {
                    if (event.originalEvent) {
                        JobDetailsView.cancel();
                    }
                    JobDetailsView.destroyDialog();
                }                      
            };
        },
        destroyDialog: function (keepState) {
            if (!JobDetailsView.Dialog) return;
            
            JobDetailsView.Dialog.remove();
            JobDetailsView.Dialog = null;
            if (keepState !== true) {
                JobDetailsView.IndexBeingEdited = null;
            }
        },
        displayDialogForHtml: function (html) {
            var form = $(html);
            var dialogOptions = JobDetailsView.getDialogOptions();
            var dialog = form.dialog(dialogOptions);
            JobDetailsView.Dialog = dialog;
        },
        submit: function () {
            var form = $(contactOfficeEmailFormSelector);

            var action = form.attr("action");
            var data = form.serialize();
            $.ajax({
                url: action,
                type: "POST",
                data: data,
                cache: false,
                dataType: "json"
            }).done(function (result) { JobDetailsView.onSubmitCompleted(result); });
        },
        cancel: function () {
            console.log("closed");
            dataLayer.push({ 'event': 'overlay popup', 'eventAction': 'closed', 'eventLabel': 'message' });
        },
        onSubmitCompleted: function (result) {
            if (result.HasErrors) {
                var fieldValidationErrors = "";
                $(result.Html).find(".field-validation-error").each(function () {
                    fieldValidationErrors += $(this).text() + delimiter;
                });
                fieldValidationErrors = fieldValidationErrors.slice(0, 500);
                dataLayer.push({ 'event': 'form errors', 'eventAction': 'popup - Stel een vraag', 'eventLabel': fieldValidationErrors });
                JobDetailsView.destroyDialog(true);
                JobDetailsView.displayDialogForHtml(result.Html);
                return;
            }

            console.log("submitted");
            dataLayer.push({ 'event': 'overlay popup', 'eventAction': 'submitted', 'eventLabel': 'message' });
            
            $(contactEmailSentMessageSelector).show();
            JobDetailsView.destroyDialog();
        }
    };
})($);

$(function () {
    JobDetailsView.init();
});