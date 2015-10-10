$(function () {
    $("select, input:radio, input:checkbox, input:file, .form-group input:radio").not('.form-control').uniform();

    $('.selector').each(function () {
        $(this).bind('change', function () {
            var $span = $(this).find('> span');
            var selected = $(this).find(':selected').text();
            $span.text(selected)
        })
    })

    //IE Fix for rounded boxes
    if ($.browser.msie && $.browser.version < 9) {
        $('.register').bind("change", function () {
            $('.register .box').each(function () {
                PIE.detach(this);
                PIE.attach(this);
            });
        })
    }

});