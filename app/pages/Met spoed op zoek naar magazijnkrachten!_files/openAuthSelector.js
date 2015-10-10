/// reference
//partially based on jQuery OpenID Plugin 1.1 Copyright 2009 Jarrett Vance http://jvance.com/pages/jQueryOpenIdPlugin.xhtml
$.fn.openid = function () {
    var $this = $(this);
    var $usr = $this.find('input[name=openid_username]');
    var $id = $this.find('input[name=openid_identifier]');
    var $front = $this.find('div:has(input[name=openid_username])>span:eq(0)');
    var $end = $this.find('div:has(input[name=openid_username])>span:eq(1)');
    var $usrfs = $this.find('fieldset:has(input[name=openid_username])');
    var $idfs = $this.find('fieldset:has(input[name=openid_identifier])');

    var $pid = $this.find('input[name=providerId]');

    var $cookie_name = 'openid_provider';
    var $cookie_path = '/';
    var $cookie_expires = 7;

    var submitusr = function () {
        if ($usr.val().length < 1) {
            $usr.focus();
            return false;
        }
        $id.val($front.text() + $usr.val() + $end.text());
        return true;
    };

    var submitid = function () {
        if ($id.val().length < 1) {
            $id.focus();
            return false;
        }
        return true;

    };
    
    function isMetaParentFound(parentElement) {
        if (parentElement.length > 0) {
            if (parentElement.prop('id') == "meta") {
                return true;
            }                
            return isMetaParentFound(parentElement.parent());
        } else {
            return false;
        }
    }
    
    var direct = function (e) {
        e.preventDefault();
        var isSocialMediaRegistrationFromtheTopLoginForm = isMetaParentFound($(this).parent());
        var isOldLoginForm = typeof RegistrationBindings === 'undefined';
        var isExistingUser = false;
        var isNewLoginFormUserNameExists = document.getElementsByName("UserName").length == 0;
        var isNewLoginFormUserNameValid = false;
        if (!isOldLoginForm) {
            isExistingUser = RegistrationBindings.registrationViewModel.emailComponent.displayMessage() == "off";
        }
        if (!isExistingUser && !isSocialMediaRegistrationFromtheTopLoginForm && !isNewLoginFormUserNameExists) {
            isNewLoginFormUserNameValid = $("input[name='UserName']").valid(); 
        }
        var $li = $(this);
        
        $li.parent().find('li').removeClass('highlight');
        $li.addClass('highlight');
        $usrfs.fadeOut();
        $idfs.fadeOut();

        $this.unbind('submit').submit(function () {
            $id.val($this.find("li.highlight span").text());
            $pid.val($this.find("li.highlight a").attr("data-provider-id")); // set id
            setCookie($this.find('li.highlight').attr('id'));
        });
        
        if (isSocialMediaRegistrationFromtheTopLoginForm || isOldLoginForm || isExistingUser || isNewLoginFormUserNameExists || isNewLoginFormUserNameValid) {
            $this.submit();
        }
    };

    var openid = function (e) {
        e.preventDefault();
        var $li = $(this);
        $li.parent().find('li').removeClass('highlight');
        $li.addClass('highlight');
        $usrfs.hide();
        $idfs.show();
        $id.focus();
        $pid.val($this.find('li.highlight a').attr('data-provider-id')); // set id
        setCookie($this.find('li highlight').attr('id'));
        $this.unbind('submit').submit(submitid);
    };

    var username = function (e) {
        e.preventDefault();
        var $li = $(this);
        $li.parent().find('li').removeClass('highlight');
        $li.addClass('highlight');
        $idfs.hide();
        $usrfs.show();
        $this.find('label[for=openid_username] span').text($li.attr("title"));
        $front.text($li.find("span").text().split("username")[0]);
        $end.text("").text($li.find("span").text().split("username")[1]);
        $id.focus();
        $pid.val($this.find("li.highlight a").attr("data-provider-id")); // set id
        setCookie($this.find('li highlight').attr('id'));
        $this.unbind('submit').submit(submitusr);
    };

    var setCookie = function (value) {
        var date = new Date();
        date.setTime(date.getTime() + ($cookie_expires * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
        document.cookie = $cookie_name + "=" + value + expires + "; path=" + $cookie_path;
    };

    var readCookie = function () {
        var nameEQ = $cookie_name + '=';
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0)
                return c.substring(nameEQ.length, c.length);
        }
        return null;
    };

    $this.find('li.direct').click(direct);
    $this.find('li.openid').click(openid);
    $this.find('li.username').click(username);
    $id.keypress(function (e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
            return submitid();
        }
    });
    $usr.keypress(function (e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
            return submitusr();
        }
    });
    $this.find('li span').hide();
    $this.find('li').css('line-height', 0).css('cursor', 'pointer');

//    $this.find('li[id=' + readCookie() + ']').addClass('highlight');

    $usrfs.hide();
    $idfs.hide();

    return this;
};

$(document).ready(function () { $("form.openid").each(function(index) { $(this).openid(); }); });