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
    var windowHeight = $(window).height();
    $('.notificationSaveMessage').removeClass('hidden');
    var elementHeight = $('.notificationSaveMessage').height();
    var newTop = windowHeight - elementHeight;
    newTop = (newTop/2) - 60;
    $('.notificationSaveMessage').css('top', newTop+'px');
    setTimeout(function(){ $('.notificationSaveMessage').addClass('hidden'); }, 3000);
})

// $('.notificationBalloon ul li a').each(function(){
//     var tempText = $(this).text();
//     if(tempText.length > 40){
//         var newSubText = tempText.substr(0, 40) + '...';    
//     }else{
//         newSubText = tempText;
//     }
//     $(this).html(newSubText);
// });

var indexHour = -1;
function pad(num, size) {
    var s = "0" + num;
    return s.substr(s.length-size);
}
$('.hour .olympia-arrow-up').on('click', function(){
    if(indexHour < 23){
        indexHour++;
        indexHour = pad(indexHour,2);
        $('.clock .hour .value').val(indexHour);
    }else if(indexHour == 23){
        indexHour = 0;
        indexHour = pad(indexHour,2);
        $('.clock .hour .value').val(indexHour);
    }
});
$('.hour .olympia-arrow-down').on('click', function(){
    if(indexHour >= 0){
        indexHour--;
        indexHour = pad(indexHour,2);
        if(indexHour < 0){
            indexHour = 23;
            $('.clock .hour .value').val(indexHour);
        }else{
            $('.clock .hour .value').val(indexHour);    
        }
    }else if(indexHour == -1){
        indexHour = 23;
        $('.clock .hour .value').val(indexHour);
    }
});
var indexMinute = -1;
$('.minutes .olympia-arrow-up').on('click', function(){
    if(indexMinute < 59){
        indexMinute++;
        indexMinute = pad(indexMinute,2);
        $('.clock .minutes .value').val(indexMinute);
    }else if(indexMinute == 59){
        indexMinute = 0;
        indexMinute = pad(indexMinute,2);
        $('.clock .minutes .value').val(indexMinute);
    }
});
$('.minutes .olympia-arrow-down').on('click', function(){
    if(indexMinute >= 0){
        indexMinute--;
        indexMinute = pad(indexMinute,2);
        if(indexMinute < 0){
            indexMinute = 59;
            $('.clock .minutes .value').val(indexMinute);
        }else{
            $('.clock .minutes .value').val(indexMinute);    
        }
    }else if(indexMinute == -1){
        indexMinute = 59;
        $('.clock .minutes .value').val(indexMinute);
    }
});
var days = ['maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag', 'zondag']
var indexDay = -1;
$('.day .olympia-arrow-up').on('click', function(){
    if(indexDay < 6){
        indexDay++;
        $('.clock .day .value').html(days[indexDay]);
    }else if(indexDay == 6){
        indexDay = 0;
        $('.clock .day .value').html(days[indexDay]);
    }
});
$('.day .olympia-arrow-down').on('click', function(){
    if(indexDay >= 0){
        indexDay--;
        if(indexDay < 0){
            indexDay = 6;
            $('.clock .day .value').html(days[indexDay]);
        }else{
            $('.clock .day .value').html(days[indexDay]);
        }
    }else if(indexDay == -1){
        indexDay = 6;
        $('.clock .day .value').html(days[indexDay]);
    }
});