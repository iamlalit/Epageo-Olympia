//to toggle the accordion
function toggleView(obj) // the li element clicked in the current scope
{
    var element = obj;  // This is the DOM object being clicked
    var $this = $(obj); // This is the jQuery object being clicked
    //this is to remove the previous show class from the ul li elements
    //this will add new show class where user has clicked
    if($this.closest('li').hasClass('show')==true){
        $('.accordion-data > li').removeClass('show');
    }else{
        $('.accordion-data > li').removeClass('show');
        $this.closest('li').addClass('show');
    }

    $('.accordion-data > li').find('.olympia-icon').addClass('olympia-caret-down').removeClass('olympia-caret-up');
    $('.accordion-data > li.show').find('.olympia-icon').addClass('olympia-caret-up').removeClass('olympia-caret-down');
    
    //this will scroll the page to the accordion where user has clicked
    $this.scrollView();
}

//to work the tooltip
$('#tooltip1,#tooltip2,#tooltip3,#tooltip4,#tooltip5,#tooltip6,#tooltip7,#tooltip8,#tooltip9,#tooltip10,#tooltip11,#tooltip12,#tooltip13,#tooltip14,#tooltip15,#tooltip16,#tooltip17,#tooltip18,#tooltip19,#tooltip20,#tooltip21').popover({
    container: 'body',
    html: true,

})
.css({'cursor': 'pointer'});

//to hide or toggle the popover on clicking anywhere on the body
$('body').on('click', function (e) {
    $('[data-toggle="popover"]').each(function () {
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
            $(this).popover('hide');
        }
    });
});

//to scroll to a point on the screen where user clicked
$.fn.scrollView = function () {
    return this.each(function () {
        $('html, body').animate({
            scrollTop: $(this).offset().top -10
        }, 1000);
    });
}