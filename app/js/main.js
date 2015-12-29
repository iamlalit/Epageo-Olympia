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

    $('.accordion-data > li').find('.olympia-caret-up').addClass('olympia-caret-down').removeClass('olympia-caret-up');
    $('.accordion-data > li.show').find('.olympia-caret-down').addClass('olympia-caret-up').removeClass('olympia-caret-down');
    
    //this will scroll the page to the accordion where user has clicked
    $this.scrollView(10);
}

//for parsed query for overview sub sections
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
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
$.fn.scrollView = function (offsetValue) {
    return this.each(function () {
        $('html, body').animate({
            scrollTop: $(this).offset().top - offsetValue
        }, 1000);
    });
}
// for Navigation comes after scroll
$(window).scroll(function() {
    var secondaryNavigation = $('#secondary-navigation'), windows = $(this);
    if(windows.scrollTop() > 190){
        secondaryNavigation.addClass('translate-down').removeClass('translate-up');
    } else {
        secondaryNavigation.addClass('translate-up').removeClass('translate-down');
    }
});
//for my account page to scroll to the particular section
$('#secondary-navigation li a').on('click', function (e) {
    $("#"+$(this).attr('name')).scrollView(70);
    
    console.log($(this).attr('name'));

    if($("#secondary-navigation li a").hasClass('activeNav')){
        $("#secondary-navigation li a").removeClass('activeNav')
    }
    $(this).addClass('activeNav');    
});


//for suggestie page
$('.tabs div span').on('click', function (e) {
    $(this).parents('.tabs').children('div').removeClass('active');
    $(this).closest('div').addClass('active');

    if($('.left-tab').hasClass('active')){
        $('.right-tab-data').addClass('hidden');
        $('.left-tab-data').removeClass('hidden');
    }else{
        $('.left-tab-data').addClass('hidden');
        $('.right-tab-data').removeClass('hidden');
    }
});

//job body ellipsis
$('.left-tab-data ul > li .jobBody p span').text(function(index, currentText) {
    return currentText.substr(0, 250);
});

var text11 = false;
$('.olympia-camera').mouseover(function(){
    $('.text1').removeClass('hidden');
})
$('.olympia-camera').mouseout(function(){
    $('.text1').addClass('hidden');
})
$('.progress').mouseover(function(){
    $('.text2').removeClass('hidden');
})
$('.progress').mouseout(function(){
    $('.text2').addClass('hidden');
})
$('.notificationSaveMessage1').click(function(){
    $('.notificationSaveMessage').removeClass('hidden');
    setTimeout(function(){ $('.notificationSaveMessage').addClass('hidden'); }, 3000);
})
