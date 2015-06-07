function toggleView(obj) // the li element clicked in the current scope
{
    var element = obj;  // This is the DOM object being clicked
    var $this = $(obj); // This is the jQuery object being clicked
    $this.closest('li').toggleClass('show');
    var $switchClass = $this.find('.olympia-icon');
    if($switchClass.hasClass('olympia-caret-down')){
        $switchClass.removeClass('olympia-caret-down');
        $switchClass.addClass('olympia-caret-up');
    }else{
        $switchClass.addClass('olympia-caret-down');
        $switchClass.removeClass('olympia-caret-up');
    }
}

$('#tooltip1,#tooltip2,#tooltip3,#tooltip4,#tooltip5,#tooltip6,#tooltip7,#tooltip8,#tooltip9,#tooltip10,#tooltip11,#tooltip12,#tooltip13,#tooltip14,#tooltip15,#tooltip16,#tooltip17,#tooltip18,#tooltip19,#tooltip20,#tooltip21').popover({
    container: 'body',
    html: true,

})
.css({'cursor': 'pointer'});

$('body').on('click', function (e) {
    $('[data-toggle="popover"]').each(function () {
        //the 'is' for buttons that trigger popups
        //the 'has' for icons within a button that triggers a popup
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
            $(this).popover('hide');
        }
    });
});