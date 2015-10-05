$(document).ready(function(){
	var voorkeurenString = 'Ja, ik ben op zoek naar werk. Ik ben beschikbaar'; 
	var voorkeurenString1 = $(".nieuw #pop-startdatum-date-1").val() + '-' + $(".nieuw #pop-startdatum-maand-1").val() + '-' + $(".nieuw #pop-startdatum-jaar-1").val() + ' tot en met ' + $(".nieuw #pop-enddatum-date-1").val() + '-' + $(".nieuw #pop-enddatum-maand-1").val() + '-' + $(".nieuw #pop-enddatum-jaar-1").val() + '.';
	var voorkeurenString2 = 'Nee, ik heb een opzegtermijn';
	$(".actualString .string1").text(voorkeurenString);
	$(".actualString span .dates").text(voorkeurenString1);
	$(".actualString span .string2").text(voorkeurenString2);
	
	$('input[name=radioNieuw]').click(function() {
		var selected = $(".nieuw input[type='radio']:checked");
		if (selected.length > 0) {
			// console.log(selected.val())
		    if(selected.val() == 'option1'){
		    	$(".nieuw #pop-startdatum-date-1").removeAttr("disabled");
				$(".nieuw #pop-startdatum-maand-1").removeAttr("disabled");
				$(".nieuw #pop-startdatum-jaar-1").removeAttr("disabled");
				$(".nieuw #pop-enddatum-date-1").removeAttr("disabled");
				$(".nieuw #pop-enddatum-maand-1").removeAttr("disabled");
				$(".nieuw #pop-enddatum-jaar-1").removeAttr("disabled");
				voorkeurenString = 'Ja, ik ben op zoek naar werk. Ik ben beschikbaar'; 
				voorkeurenString1 = $(".nieuw #pop-startdatum-date-1").val() + '-' + $(".nieuw #pop-startdatum-maand-1").val() + '-' + $(".nieuw #pop-startdatum-jaar-1").val() + ' tot en met ' + $(".nieuw #pop-enddatum-date-1").val() + '-' + $(".nieuw #pop-enddatum-maand-1").val() + '-' + $(".nieuw #pop-enddatum-jaar-1").val() + '.';
		    }else if(selected.val() == 'option2'){
		    	$("#pop-startdatum-maand-1").prop("disabled", "disabled");
				$("#pop-startdatum-jaar-1").prop("disabled", "disabled");
				$("#pop-startdatum-date-1").prop("disabled", "disabled");
				$("#pop-enddatum-maand-1").prop("disabled", "disabled");
				$("#pop-enddatum-jaar-1").prop("disabled", "disabled");
				$("#pop-enddatum-date-1").prop("disabled", "disabled");
				voorkeurenString = 'Nee, ik ben niet meer op zoek naar werk';
				voorkeurenString1 = '';
		    }else if(selected.val() == 'option3'){
		    	$("#pop-startdatum-maand-1").prop("disabled", "disabled");
				$("#pop-startdatum-jaar-1").prop("disabled", "disabled");
				$("#pop-startdatum-date-1").prop("disabled", "disabled");
				$("#pop-enddatum-maand-1").prop("disabled", "disabled");
				$("#pop-enddatum-jaar-1").prop("disabled", "disabled");
				$("#pop-enddatum-date-1").prop("disabled", "disabled");
				voorkeurenString = 'Nee, ik ben niet meer op zoek naar werk en wil ook niet meer benaderd worden door Olympia';
				voorkeurenString1 = '';
		    }
		}
	});
	
	$('#pop-weken-1').on('change', function(){
		daysLeft = $("#pop-weken-1").val();
		if(daysLeft != '1'){
			$('#pop-maanden-1').remove('option');
			$('#pop-maanden-1').html('<option value="0" selected>weken</option>'+
									 '<option value="1">maanden</option>')	
		}else{
			$('#pop-maanden-1').remove('option');
			$('#pop-maanden-1').html('<option value="2" selected>week</option>'+
									 '<option value="3">maand</option>')	
		}
	})

	$('input[name=radioNieuw], input[name=opzegtermijn], #pop-weken-1, #pop-maanden-1, #pop-startdatum-date-1, #pop-startdatum-maand-1, #pop-startdatum-jaar-1, #pop-enddatum-date-1, #pop-enddatum-maand-1, #pop-enddatum-jaar-1').on('change', function(){
		var firstSelected = $("input[name='radioNieuw']:checked");
		var secondSelected = $("input[name='opzegtermijn']:checked");
		if(firstSelected.val() == 'option3'){
			$('.opzegtermijn').addClass('hidden');
		}else{
			$('.opzegtermijn').removeClass('hidden');
		}
		var startDate = $(".nieuw #pop-startdatum-date-1").val(),
			startMonth = $(".nieuw #pop-startdatum-maand-1").val(),
			startYear = $(".nieuw #pop-startdatum-jaar-1").val(),
			endDate = $(".nieuw #pop-enddatum-date-1").val(),
			endMonth = $(".nieuw #pop-enddatum-maand-1").val(),
			endYear = $(".nieuw #pop-enddatum-jaar-1").val(),
			daysLeft = $("#pop-weken-1").val(),
			chooseOption = $("#pop-maanden-1").val();



		var newStringToPaste = '';
		if(firstSelected.val() == 'option1' && secondSelected.val() == 'option2'){
			if(endYear >= startYear && endMonth >= startMonth && endDate >= startDate){
				$('.row.error').removeClass('hidden');
				$('#modal-voorkeuren-add').attr('disabled', 'disabled');
			}else{
				$('#modal-voorkeuren-add').removeAttr('disabled');
				$('.row.error').addClass('hidden');
				if(endDate == '0' || endMonth == '00' || endYear == '0'){
					newStringToPaste = "<span class='actualString'><strong>Ja</strong>, ik ben <strong>op zoek</strong> naar werk. <br>Ik ben <strong>beschikbaar vanaf "+startDate+" "+startMonth+" "+startYear+" </strong>. Ik heb <strong>geen opzegtermijn</strong>.</span><span class='olympia-icon olympia-pencil' data-toggle='modal' data-target='#bewerkenVoorkeuren'></span>";
				}else if(endDate != '0' && endMonth != '00' && endYear != '0'){
					newStringToPaste = "<span class='actualString'><strong>Ja</strong>, ik ben <strong>op zoek</strong> naar werk. <br>Ik ben <strong>beschikbaar vanaf "+startDate+" "+startMonth+" "+startYear+" tot "+endDate+" "+endMonth+" "+endYear+" </strong>. Ik heb <strong>geen opzegtermijn</strong>.</span><span class='olympia-icon olympia-pencil' data-toggle='modal' data-target='#bewerkenVoorkeuren'></span>";
				}else{
					newStringToPaste = "<span class='actualString'><strong>Ja</strong>, ik ben <strong>op zoek</strong> naar werk. <br>Ik ben <strong>beschikbaar vanaf "+startDate+" "+startMonth+" "+startYear+" </strong>. Ik heb <strong>geen opzegtermijn</strong>.</span><span class='olympia-icon olympia-pencil' data-toggle='modal' data-target='#bewerkenVoorkeuren'></span>";
				}
			}			
		}else if(firstSelected.val() == 'option1' && secondSelected.val() == 'option1'){
			if(endYear >= startYear && endMonth >= startMonth && endDate >= startDate){
				$('.row.error').removeClass('hidden');
				$('#modal-voorkeuren-add').attr('disabled', 'disabled');
			}else{
				$('#modal-voorkeuren-add').removeAttr('disabled');
				if(endDate == '0' || endMonth == '00' || endYear == '0'){
					if(daysLeft != '1' && chooseOption == '0'){
						newStringToPaste = "<span class='actualString'><strong>Ja</strong>, ik ben <strong>op zoek</strong> naar werk. <br>Ik ben <strong>beschikbaar vanaf "+startDate+" "+startMonth+" "+startYear+" </strong>. Ik heb <strong>een opzegtermijn van "+ daysLeft +" weken.</strong><span class='olympia-icon olympia-pencil' data-toggle='modal' data-target='#bewerkenVoorkeuren'></span>";
					}else if(daysLeft != '1' && chooseOption == '1'){
						newStringToPaste = "<span class='actualString'><strong>Ja</strong>, ik ben <strong>op zoek</strong> naar werk. <br>Ik ben <strong>beschikbaar vanaf "+startDate+" "+startMonth+" "+startYear+" </strong>. Ik heb <strong>een opzegtermijn van "+ daysLeft +" maanden.</strong></span><span class='olympia-icon olympia-pencil' data-toggle='modal' data-target='#bewerkenVoorkeuren'></span>";
					}else if(daysLeft == '1' && chooseOption == '2'){
						newStringToPaste = "<span class='actualString'><strong>Ja</strong>, ik ben <strong>op zoek</strong> naar werk. <br>Ik ben <strong>beschikbaar vanaf "+startDate+" "+startMonth+" "+startYear+" </strong>. Ik heb <strong>een opzegtermijn van "+ daysLeft +" week.</strong><span class='olympia-icon olympia-pencil' data-toggle='modal' data-target='#bewerkenVoorkeuren'></span>";
					}else if(daysLeft == '1' && chooseOption == '3'){
						newStringToPaste = "<span class='actualString'><strong>Ja</strong>, ik ben <strong>op zoek</strong> naar werk. <br>Ik ben <strong>beschikbaar vanaf "+startDate+" "+startMonth+" "+startYear+" </strong>. Ik heb <strong>een opzegtermijn van "+ daysLeft +" maand.</strong></span><span class='olympia-icon olympia-pencil' data-toggle='modal' data-target='#bewerkenVoorkeuren'></span>";
					}
				}else{
					if(daysLeft != '1' && chooseOption == '0'){
						newStringToPaste = "<span class='actualString'><strong>Ja</strong>, ik ben <strong>op zoek</strong> naar werk. <br>Ik ben <strong>beschikbaar vanaf "+startDate+" "+startMonth+" "+startYear+" tot "+endDate+" "+endMonth+" "+endYear+" </strong>. Ik heb <strong>een opzegtermijn van "+ daysLeft +" weken.</strong></span><span class='olympia-icon olympia-pencil' data-toggle='modal' data-target='#bewerkenVoorkeuren'></span>";
					}else if(daysLeft != '1' && chooseOption == '1'){
						newStringToPaste = "<span class='actualString'><strong>Ja</strong>, ik ben <strong>op zoek</strong> naar werk. <br>Ik ben <strong>beschikbaar vanaf "+startDate+" "+startMonth+" "+startYear+" tot "+endDate+" "+endMonth+" "+endYear+" </strong>. Ik heb <strong>een opzegtermijn van "+ daysLeft +" maanden.</strong></span><span class='olympia-icon olympia-pencil' data-toggle='modal' data-target='#bewerkenVoorkeuren'></span>";
					}else if(daysLeft == '1' && chooseOption == '2'){
						newStringToPaste = "<span class='actualString'><strong>Ja</strong>, ik ben <strong>op zoek</strong> naar werk. <br>Ik ben <strong>beschikbaar vanaf "+startDate+" "+startMonth+" "+startYear+" tot "+endDate+" "+endMonth+" "+endYear+" </strong>. Ik heb <strong>een opzegtermijn van "+ daysLeft +" week.</strong></span><span class='olympia-icon olympia-pencil' data-toggle='modal' data-target='#bewerkenVoorkeuren'></span>";
					}else if(daysLeft == '1' && chooseOption == '3'){
						newStringToPaste = "<span class='actualString'><strong>Ja</strong>, ik ben <strong>op zoek</strong> naar werk. <br>Ik ben <strong>beschikbaar vanaf "+startDate+" "+startMonth+" "+startYear+" tot "+endDate+" "+endMonth+" "+endYear+" </strong>. Ik heb <strong>een opzegtermijn van "+ daysLeft +" maand.</strong></span><span class='olympia-icon olympia-pencil' data-toggle='modal' data-target='#bewerkenVoorkeuren'></span>";

					}
				}
			}
			
		}else if(firstSelected.val() == 'option2' && secondSelected.val() == 'option1'){
			if(daysLeft != '1' && chooseOption == '0'){
				newStringToPaste = "<span class='actualString'><strong>Nee</strong>, ik ben <strong>niet op zoek</strong> naar werk maar ben wel geinteresseerd in vacatures <strong>en wil graag op de hoogte gehouden worden</strong>. <br>Ik heb <strong>een opzegtermijn van "+daysLeft+" weken.</strong></span><span class='olympia-icon olympia-pencil' data-toggle='modal' data-target='#bewerkenVoorkeuren'></span>";
			}else if(daysLeft != '1' && chooseOption == '1'){
				newStringToPaste = "<span class='actualString'><strong>Nee</strong>, ik ben <strong>niet op zoek</strong> naar werk maar ben wel geinteresseerd in vacatures <strong>en wil graag op de hoogte gehouden worden</strong>. <br>Ik heb <strong>een opzegtermijn van "+daysLeft+" maanden.</strong></span><span class='olympia-icon olympia-pencil' data-toggle='modal' data-target='#bewerkenVoorkeuren'></span>";
			}else if(daysLeft == '1' && chooseOption == '2'){
				newStringToPaste = "<span class='actualString'><strong>Nee</strong>, ik ben <strong>niet op zoek</strong> naar werk maar ben wel geinteresseerd in vacatures <strong>en wil graag op de hoogte gehouden worden</strong>. <br>Ik heb <strong>een opzegtermijn van "+daysLeft+" week.</strong></span><span class='olympia-icon olympia-pencil' data-toggle='modal' data-target='#bewerkenVoorkeuren'></span>";
			}else if(daysLeft == '1' && chooseOption == '3'){
				newStringToPaste = "<span class='actualString'><strong>Nee</strong>, ik ben <strong>niet op zoek</strong> naar werk maar ben wel geinteresseerd in vacatures <strong>en wil graag op de hoogte gehouden worden</strong>. <br>Ik heb <strong>een opzegtermijn van "+daysLeft+" maand.</strong></span><span class='olympia-icon olympia-pencil' data-toggle='modal' data-target='#bewerkenVoorkeuren'></span>";
			}
		}else if(firstSelected.val() == 'option2' && secondSelected.val() == 'option2'){
			newStringToPaste = "<span class='actualString'><strong>Nee</strong>, ik ben <strong>niet op zoek</strong> naar werk maar ben wel geinteresseerd in vacatures en <strong>wil graag op de hoogte gehouden worden</strong>. <br>Ik heb <strong>geen opzegtermijn</strong>.</span><span class='olympia-icon olympia-pencil' data-toggle='modal' data-target='#bewerkenVoorkeuren'></span>";
		}else if(firstSelected.val() == 'option3'){
			$('.globalCheck input[type=checkbox]').removeAttr("checked");
			$('#emailAlert a').prop('href', 'MijnOlympia-email-alerts.html?globalCheck='+false);
			newStringToPaste = "<span class='actualString'><strong>Nee</strong>, ik ben <strong>niet (meer) op zoek</strong> naar werk en wil ook <strong>niet meer benaderd worden door Olympia.</strong></span><span class='olympia-icon olympia-pencil' data-toggle='modal' data-target='#bewerkenVoorkeuren'></span>"
		}

		$('#pasteString .actualString').remove();
		$('#pasteString').append(newStringToPaste);
		$('#pasteString .olympia-pencil').remove();

		$('#pasteString1 .actualString').remove();
		$('#pasteString1 .olympia-pencil').remove();
		$('#pasteString1').append(newStringToPaste);
	});

	$('input[name=radioNieuw], input[name=opzegtermijn], #pop-weken-1, #pop-maanden-1, #pop-startdatum-date-1, #pop-startdatum-maand-1, #pop-startdatum-jaar-1, #pop-enddatum-date-1, #pop-enddatum-maand-1, #pop-enddatum-jaar-1').trigger('change');
	
	$('#phoneToggler').hide();
	$('#phoneToggle').click(function(){
		$(this).hide();
		$('#phoneToggler').show();
	});

	$('#cvUpload').click(function( event ) {
  		event.stopPropagation();
		$('#input-cvUpload').click();
		if($('input[name=cv]').val==""){
			$('#cvVal-div').hide();
		}
	});

	$('#mailToggler').hide();
	$('#mailToggle').click(function(){
		$(this).hide();
		$('#mailToggler').show();
	});

	$('#cvWrite').hide();
	$('input[name=cvChoice]').click(function(){
		var thisval = $(this).val();

		if(thisval == 'cvUpload'){
			$('#cvUpload').show();
			$('#cvWrite').hide();
		}
		else if(thisval == 'cvWrite'){
			$('#cvUpload').hide();
			$('#cvWrite').show();
		}
	});

	$('input[name=cv]').change(function() {
		var FileName  = $(this).val();
		var cvFile = FileName.replace(/^.*[\\\/]/, '');
		console.log(FileName, cvFile)
		$('#cvVal-div').removeClass('hide');
		$('#cvVal').html('<a href="javascript:void(0)">'+cvFile+'</a>');
	});

	$('input[name=certificates]').change(function() {
		var FileName  = $(this).val();
		var cvFile = FileName.replace(/^.*[\\\/]/, '');
		console.log(FileName, cvFile)
		// $('#certificateVal').html('<a href="javascript:void(0)">'+cvFile+'</a>');
		$('#certificateVal').append(
			'<div class="row">'+
				'<div class="col-sm-9">'+
					'<span><a href="javascript:void(0)">'+cvFile+'</a></span>'+
				'</div>'+
				'<div class="col-sm-3 text-right">'+
					'<a class="link-in-text" onclick="removeCertificates(this)" href="javascript:void(0)">Verwijderen</a>'+
				'</div>'+
			'</div>'
		);
	});

	$('#removeCv').click(function(){
		$('input[name=cv]').val() === '';
		$('#cvVal').empty();
		$('#cvVal-div').addClass('hide');
	});

	
})

function removeCertificates(obj){
	$this = $(obj);
	$this.closest('.row').remove();
}


$(document).ready(function(){


	$('.job-vacancy')
	.mouseover(function(){
		if($(this).children().find('a').hasClass('focused')){
			$(this).children().find('a').removeClass('focused');
		}
	})
	.mouseout(function(){
		if($(this).children().find('a').hasClass('focused') == false){
			$(this).children().find('a').eq(2).addClass('focused');
		}
	});

	$('#password-container').hide();
	$('#password-container-hide').show();

	$('input:radio[name=ques1]').click(function() {
		var checkval = $(this).val();
		$('#ques1-opt1-ans').prop('disabled', !(checkval == '1'));
	});	

	$('input[name=radioEmail]').change(function () {
        if($('input[name=radioEmail]:checked').val() == 'option2'){
			$('#password-container').show();
			$('#password-container-hide').hide();
		}else if($('input[name=radioEmail]:checked').val() == 'option1'){
			$('#password-container').hide();
			$('#password-container-hide').show();
		}
    });


	$('#errorMsg').hide();
	
	var UserData = {"email": "rob.boersma@ePageo.com",
					"firstName": "Rob",
					"lastName": "Boersma",
					"gender": "option1",
					"dob": ["20", "5", "35"],
					"phone": "02072052454",
					"mobile": "0644303526",
					"street": "Old Gloucester Street",
					"houseNo": "27",
					"postalCode": "1017 HL",
					"residense": "Amsterdam",
					"drivingLicense": ["A", "B"]
				}

	var
	errorDiv	=	$('#errorMsg'),
	errorList	=	$('#errorList'),
	email		=	$('#email'),
	logOpt		=	$('input[name="radioEmail"]'),
	password 	=	$('#password'),
	firstname	=	$('input[name="firstname"]'),
	lastname	=	$('input[name="lastname"]'),
	gender		=	$('input[name="Gaslachet"]'),
	phone		=	$('input[name="Telefoonnummer"]'),
	mobile		= 	$('input[name="Mobielnummer"]'),
	street		=	$('input[name="Straat"]'),
	houseNo		=	$('input[name="Huisnummer"]'),
	postalCode	=	$('input[name="Postcode"]'),
	residense	=	$('input[name="Woonplaats"]'),
	cv	 		=	$('input[name="cv"]'),
	ques1 		=	$('input[name="ques1"]'),
	moreHelp 	=	$('input[name="optionsRadios"]'),
	terms		=	$('#terms');

	var isPasswordEntered = false;

	var 
	emailStr,
	emailRadioStr,
	firstnameStr,
	lastnameStr,
	genderStr,
	dobmonthStr,
	dobdayStr,
	dobyearStr,
	phoneStr,
	mobileStr,	
	streetStr,
	houseNoStr,
	postalCodeStr,
	residenseStr,
	cvStr,
	ques2Str,	
	moreHelpStr,
	termsStr, 
	ques1Str;	

	$('#jobForm-section2 :input').prop("disabled", true);
	$('#jobForm-section2').addClass('grey-link');
	$('#jobForm-section2').find('select').addClass('grey-link');
	$('#jobForm-section2').find('button[type=submit]').addClass('btn-default').removeClass('btn-primary');
	$('#jobForm-section2').find('a').prop("disabled", true)
	.addClass('grey-link')
	$('#jobForm-section2').find('a i').prop("disabled", true)
	.addClass('grey-link')
	.click(function(e){
		if($(this).attr("disabled") == "disabled")
		{
			e.preventDefault();  
		}
	});
	
	//Form 1
	$('#jobForm-section1').submit(function(e) {
		e.preventDefault();
		//Email
		if(email.val() == '' || email.val() == null){
			if(errorList.find('.errormessage-form1mail').length == 0){
				var li = $('<li />', {class: 'col-sm-6 errormessage-form1mail'});
				$('<label />', {html: 'Email required !', for: 'email'}).appendTo(li);
				li.appendTo(errorList);
				$('#errorMsg').show();
				email.parent().addClass('has-error');
			}
		}else{
			var re = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
			if (!re.test(email.val())) {
				if(errorList.find('.col-sm-6 errormessage-form1mail').length == 0){
					var li = $('<li />', {class: '.col-sm-6 errormessage-form1mail'})
					$('<label />', {html: 'Vul e-mail adres in.', for: 'email'}).appendTo(li);
					li.appendTo(errorList)
					$('#errorMsg').show();
				}
			} else {
				if(email.parent().hasClass('has-error')){
					email.parent().removeClass('has-error')
				};
				if(errorList.find('.errormessage-form1mail').length > 0){
					errorList.find('.errormessage-form1mail').remove();
					$('#errorMsg').hide();
				}
			}
		}

		// radio
		$.each(logOpt, function() {
			if (this.checked)
				emailRadioStr = this.value;
			if(emailRadioStr == '' || emailRadioStr == undefined){
				if(errorList.find('.logOpt-form1radio').length == 0){
					$('<li />', {html: 'Selecteer een optie !', class : 'col-sm-6 logOpt-form1radio'}).appendTo(errorList);
					$('#errorMsg').show();
					logOpt.parent().parent().parent().addClass('has-error');
				}
			}
			else{
				if(logOpt.parent().parent().parent().hasClass('has-error')){
					logOpt.parent().parent().parent().removeClass('has-error')
				};
				if(errorList.find('.logOpt-form1radio').length > 0){
					errorList.find('.logOpt-form1radio').remove();
					$('#errorMsg').hide();
				}
			}

			if(emailRadioStr == 'option2'){
				if(password.val() == '' || password.val() == null)
				{
					if(errorList.find('.errormessage-password').length == 0){
						$('<li />', {html: 'Vul wachtwoord in', class : 'col-sm-6 errormessage-password'})
						.appendTo(errorList)
						.click(function(){
							$('html, body').animate({
								scrollTop: firstname.offset().top - 100
							}, 500);
							password.focus();
						})
						$('#errorMsg').show();
						password.parent().addClass('has-error');
					}
				}else{
					if(password.parent().hasClass('has-error')){
						password.parent().removeClass('has-error')
					};
					if(errorList.find('.errormessage-password').length > 0){
						errorList.find('.errormessage-password').remove();
						$('#errorMsg').hide();
					}
					isPasswordEntered = true;
				}
			}
		});

		if(errorList.find('.errormessage-form1mail').length == 0 &&
			errorList.find('.logOpt-form1radio').length == 0 &&
			errorList.find('.errormessage-password').length == 0){
			
			//to check for rob data
			if(email.val() === UserData.email){
				//to set the second option
				$('input[name="radioEmail"][value="option2"]').prop('checked', true);
				$('#password-container').show();
				$('#password-container-hide').hide();
				if(isPasswordEntered){
					$('#jobForm-section2 :input').prop("disabled", false);
					$('#jobForm-section2').find('a').removeAttr("disabled").removeClass('grey-link');
					$('#jobForm-section2').removeClass('grey-link');
					$('#jobForm-section2').find('select').removeClass('grey-link');
					$('#jobForm-section2').find('button[type=submit]').addClass('btn-primary').removeClass('btn-default');
					$('#jobForm-section2').find('a i').prop("disabled", false)
					.removeClass('grey-link')
					
					$('#firstname').focus();	
					$('html, body').animate({
						scrollTop: $("#firstname").offset().top - 100
					}, 500);	
					//now to set the dummy data according to json object
					firstname.val(UserData.firstName);
					lastname.val(UserData.lastName);
					$('input[name="Gaslachet"][value="option1"]').prop('checked', true);
					$('select[name^="dobDay"] option[value="'+UserData.dob[0]+'"]').attr("selected","selected");
					$('select[name^="dobMonth"] option[value="'+UserData.dob[1]+'"]').attr("selected","selected");
					$('select[name^="SelectedYear"] option[value="'+UserData.dob[2]+'"]').attr("selected","selected");
					phone.val(UserData.phone);
					mobile.val(UserData.mobile);
					houseNo.val(UserData.houseNo);
					postalCode.val(UserData.postalCode);
					residense.val(UserData.residense);
					street.val(UserData.street);
				}
			}else{
				$('#jobForm-section2 :input').prop("disabled", false);
				$('#jobForm-section2').find('a').removeAttr("disabled").removeClass('grey-link');
				$('#jobForm-section2').removeClass('grey-link');
				$('#jobForm-section2').find('select').removeClass('grey-link');
				$('#jobForm-section2').find('button[type=submit]').addClass('btn-primary').removeClass('btn-default');
				$('#jobForm-section2').find('a i').prop("disabled", false)
				.removeClass('grey-link')
				
				$('#firstname').focus();	
				$('html, body').animate({
					scrollTop: $("#firstname").offset().top - 100
				}, 500);
			}
		}
		else
		{
			$('html, body').animate({
				scrollTop: $("#errorMsg").offset().top - 100
			}, 500);
		}

	});
	
	$('#jobForm-section2').submit(function(e)
	{
		e.preventDefault();

		if(firstname.val() == '' || firstname.val() == null)
		{
			if(errorList.find('.errormessage-firstname').length == 0){
				$('<li />', {html: 'Vul voornaam in', class : 'col-sm-6 errormessage-firstname'})
				.appendTo(errorList)
				.click(function(){
					$('html, body').animate({
						scrollTop: firstname.offset().top - 100
					}, 500);
					firstname.focus();
				})
				//$('#errorMsg').show();
				firstname.parent().addClass('has-error');
			}
		}else{
			if(firstname.parent().hasClass('has-error')){
				firstname.parent().removeClass('has-error')
			};
			if(errorList.find('.errormessage-firstname').length > 0){
				errorList.find('.errormessage-firstname').remove();
				//$('#errorMsg').hide();
			}
		}

		if(lastname.val() == '' || lastname.val() == null)
		{
			if(errorList.find('.errormessage-lastname').length == 0){
				$('<li />', {html: 'Vul achternaam in', class : 'col-sm-6 errormessage-lastname'})
				.appendTo(errorList)
				.click(function(){
					$('html, body').animate({
						scrollTop: lastname.offset().top - 100
					}, 500);
					lastname.focus();
				})
				//$('#errorMsg').show();
				lastname.parent().addClass('has-error');
			}
		}else{
			if(lastname.parent().hasClass('has-error')){
				lastname.parent().removeClass('has-error')
			};
			if(errorList.find('.errormessage-lastname').length > 0){
				errorList.find('.errormessage-lastname').remove();
				//$('#errorMsg').hide();
			}
		}
		
		//Gender
		$.each(gender, function() {
			if (this.checked)
				genderStr = this.value;
	   
			if(genderStr == '' || genderStr == undefined){
				if(errorList.find('.errormessage-gender').length == 0){
					$('<li />', {html: 'Vul geslacht in', class : 'col-sm-6 errormessage-gender'})
					.appendTo(errorList)
					.click(function(){
						$('html, body').animate({
							scrollTop: $("#gender").offset().top - 100
						}, 500);
					});
					//$('#errorMsg').show();
					gender.parent().parent().addClass('has-error');
				}
			}else{
				if(gender.parent().parent().hasClass('has-error')){
					gender.parent().parent().removeClass('has-error')
				};
				if(errorList.find('.errormessage-gender').length > 0){
					errorList.find('.errormessage-gender').remove();
					//$('#errorMsg').hide();
				}
				//localStorage.setItem('logGender', genderStr);
			}
		});

		// DOB
		if(
			parseInt($('#month option:selected').val()) == 0 ||
			parseInt($('#day option:selected').val()) == 0 ||
			parseInt($('#year option:selected').val()) == 0
		){
			if(errorList.find('.errormessage-dob').length == 0){
				$('<li />', {html: 'Vul geboortedatum in', class : 'col-sm-6 errormessage-dob'})
				.appendTo(errorList)
				.click(function(){
					$('html, body').animate({
						scrollTop: $("#month").offset().top - 100
					}, 500);
					$("#month").focus();
				});
				//$('#errorMsg').show();
				$('#month , #day, #year').parent().parent().parent().addClass('has-error');
			}
		}else{
			if($('#month , #day, #year').parent().parent().parent().hasClass('has-error')){
				$('#month , #day, #year').parent().parent().parent().removeClass('has-error')
			};

			if(errorList.find('.errormessage-dob').length > 0){
				errorList.find('.errormessage-dob').remove();
				//$('#errorMsg').hide();
			}
		}

		//Phone
		if(phone.val() == '' || phone.val() == null)
		{
			if(errorList.find('.errormessage-phone').length == 0){
				$('<li />', {html: 'Vul telefoonnummer in', class : 'col-sm-6 errormessage-phone'})
				.appendTo(errorList)
				.click(function(){
					$('html, body').animate({
						scrollTop: phone.offset().top - 100
					}, 500);
					phone.focus();
				});
				//$('#errorMsg').show();
				phone.parent().addClass('has-error');
			}
		}else{
			var reg = new RegExp('^\\d+$');
			if(!reg.test(phone.val())){
				if(errorList.find('.errormessage-phone').length == 0){
					$('<li />', {html: 'Vul geldig telefoonnummer', class : 'col-sm-6 errormessage-phone'})
					.appendTo(errorList)
					.click(function(){
						$('html, body').animate({
							scrollTop: phone.offset().top - 100
						}, 500);
						phone.focus();
					});
					//$('#errorMsg').show();
					phone.parent().addClass('has-error');
				}
			}
			else{
				if(phone.parent().hasClass('has-error')){
					phone.parent().removeClass('has-error')
				};
				if(errorList.find('.errormessage-phone').length > 0){
					errorList.find('.errormessage-phone').remove();
					//$('#errorMsg').hide();
				}
			}
		}

		//Mobile
		if(mobile.val() == '' || mobile.val() == null)
		{
			if(errorList.find('.errormessage-mobile').length == 0){
				$('<li />', {html: 'Vul mobielnummer in', class : 'col-sm-6 errormessage-mobile'})
				.appendTo(errorList)
				.click(function(){
					$('html, body').animate({
						scrollTop: mobile.offset().top - 100
					}, 500);
					mobile.focus();
				});
				//$('#errorMsg').show();
				mobile.parent().addClass('has-error');
			}
		}else{
			var reg = new RegExp('^\\d+$');
			if(!reg.test(mobile.val())){
				if(errorList.find('.errormessage-mobile').length == 0){
					$('<li />', {html: 'Vul geldig mobielnummer', class : 'col-sm-6 errormessage-mobile'})
					.appendTo(errorList)
					.click(function(){
						$('html, body').animate({
							scrollTop: mobile.offset().top - 100
						}, 500);
						mobile.focus();
					});
					//$('#errorMsg').show();
					mobile.parent().addClass('has-error');
				}
			}
			else{
				if(mobile.parent().hasClass('has-error')){
					mobile.parent().removeClass('has-error')
				};
				if(errorList.find('.errormessage-mobile').length > 0){
					errorList.find('.errormessage-mobile').remove();
					//$('#errorMsg').hide();
				}
			}
		}




		// Street
		if(street.val() == '' || street.val() == null)
		{
			if(errorList.find('.errormessage-street').length == 0){
				$('<li />', {html: 'Vul straatnaam in', class : 'col-sm-6 errormessage-street'})
				.appendTo(errorList)
				.click(function(){
					$('html, body').animate({
						scrollTop: street.offset().top - 100
					}, 500);
					street.focus();
				});
				//$('#errorMsg').show();
				street.parent().addClass('has-error');
			}
		}else{
			if(street.parent().hasClass('has-error')){
				street.parent().removeClass('has-error')
			};
			if(errorList.find('.errormessage-street').length > 0){
				errorList.find('.errormessage-street').remove();
				//$('#errorMsg').hide();
			}
		}

		// House no.
		if(houseNo.val() == '' || houseNo.val() == null)
		{
			if(errorList.find('.errormessage-houseNo').length == 0){
				$('<li />', {html: 'Vul huisnummer in', class : 'col-sm-6 errormessage-houseNo'})
				.appendTo(errorList)
				.click(function(){
					$('html, body').animate({
						scrollTop: houseNo.offset().top - 100
					}, 500);
					houseNo.focus();
				});
				//$('#errorMsg').show();
				houseNo.parent().addClass('has-error');
			}
		}else{
			if(houseNo.parent().hasClass('has-error')){
				houseNo.parent().removeClass('has-error')
			};
			if(errorList.find('.errormessage-houseNo').length > 0){
				errorList.find('.errormessage-houseNo').remove();
				//$('#errorMsg').hide();
			}
		}

		// postal Code
		if(postalCode.val() == '' || postalCode.val() == null)
		{
			if(errorList.find('.errormessage-postalCode').length == 0){
				$('<li />', {html: 'Vul postcode in', class : 'col-sm-6 errormessage-postalCode'})
				.appendTo(errorList)
				.click(function(){
					$('html, body').animate({
						scrollTop: postalCode.offset().top - 100
					}, 500);
					postalCode.focus();
				});
				//$('#errorMsg').show();
				postalCode.parent().addClass('has-error');
			}
		}else{
			if(postalCode.parent().hasClass('has-error')){
				postalCode.parent().removeClass('has-error')
			};
			if(errorList.find('.errormessage-postalCode').length > 0){
				errorList.find('.errormessage-postalCode').remove();
				//$('#errorMsg').hide();
			}
		}

		// Woonplaats
		if(residense.val() == '' || residense.val() == null)
		{
			if(errorList.find('.errormessage-residense').length == 0){
				$('<li />', {html: 'Vul woonplaats in', class : 'col-sm-6 errormessage-residense'})
				.appendTo(errorList)
				.click(function(){
					$('html, body').animate({
						scrollTop: residense.offset().top - 100
					}, 500);
					residense.focus();
				});
				//$('#errorMsg').show();
				residense.parent().addClass('has-error');
			}
		}else{
			if(residense.parent().hasClass('has-error')){
				residense.parent().removeClass('has-error')
			};
			if(errorList.find('.errormessage-residense').length > 0){
				errorList.find('.errormessage-residense').remove();
				//$('#errorMsg').hide();
			}
		}

		// 
		$.each($('input[name="cvChoice"]'), function() {
			if ($('input[name="cvChoice"]:checked')){
				cvStr = $('input[name="cvChoice"]:checked').val();

				if(cvStr == '' || cvStr == null){
					if(errorList.find('.errormessage-cvStr').length == 0){
						$('<li />', {html: 'Vul geslacht in', class : 'col-sm-6 errormessage-cvStr'})
						.appendTo(errorList)
						.click(function(){
							$('html, body').animate({
								scrollTop: $("#cvContainer").offset().top - 100
							}, 500);
						});
						//$('#errorMsg').show();
						cv.parent().parent().addClass('has-error');
					}
				}

				if(cvStr == 'cvUpload') {
					if(cv.val() == '' || cv.val() == null){
						if(errorList.find('.errormessage-cv').length == 0){
							$('<li />', {html: 'Voeg een CV toe door optie 1 of 2 te kiezen', class : 'col-sm-6 errormessage-cv'})
							.appendTo(errorList)
							.click(function(){
								$('html, body').animate({
									scrollTop: $("#cvUpload").offset().top - 100
								}, 500);
							});
							//$('#errorMsg').show();
							cv.parent().parent().parent().addClass('has-error');
						}
					}else{
						var FileName  = cv.val();
						var FileExt = FileName.substr(FileName.lastIndexOf('.')+1);
						var FileSize = cv[0].files[0].size;
						var FileSizeMB = (FileSize/10485760).toFixed(2);
						if (FileExt != "pdf" && FileExt != "doc" && FileExt != "docx"){
							if(errorList.find('.errormessage-cv2').length == 0){
								$('<li />', {html: 'Upload. Doc,. Docx of. Pdf-bestand voor cv!', class : 'col-sm-6 errormessage-cv2'})
								.appendTo(errorList)
								.click(function(){
									$('html, body').animate({
										scrollTop: $("#cvUpload").offset().top - 100
									}, 500);
								});
								$('#cvUpload').focus();
								//$('#errorMsg').show();
								cv.parent().parent().parent().addClass('has-error');
							}
							return false;
						}else if(FileSize > 10485760){
							if(errorList.find('.errormessage-cv3').length == 0){
								$('<li />', {html: 'Grootte CV toe is groter dan 2MB', class : 'col-sm-6 errormessage-cv3'})
								.appendTo(errorList)
								.click(function(){
									$('html, body').animate({
										scrollTop: $("#cvUpload").offset().top - 100
									}, 500);
								});
								$('#cvUpload').focus();
								//$('#errorMsg').show();
								cv.parent().parent().parent().addClass('has-error');
							}
						}else{
							if(cv.parent().parent().parent().hasClass('has-error')){
								cv.parent().parent().parent().removeClass('has-error')
							};
							if(errorList.find('.errormessage-cv, .errormessage-cv2, .errormessage-cv3').length > 0){
								errorList.find('.errormessage-cv, .errormessage-cv2, .errormessage-cv3').remove();
								//$('#errorMsg').hide();
							}
							
							var cvFile = FileName.replace(/^.*[\\\/]/, '');
							console.log(cvFile);
							$('#cvVal-div').show();
							$('#cvVal').html('<a href="javascript:void(0)">'+cvFile+'</a>');

						}
					}
				}

				if(cvStr == 'cvWrite'){
					if($('#pastwork-info-container').children().length == 0 || $('#pastedu-info-container').children().length == 0){
						if(errorList.find('.errormessage-pastedu').length == 0){
							$('<li />', {html: 'schrijf uw CV.', class : 'col-sm-6 errormessage-pastedu'})
							.appendTo(errorList)
							.click(function(){
								$('html, body').animate({
									scrollTop: $("#cvWrite").offset().top - 100
								}, 500);
							});
							$('#cvWrite').focus();
							//$('#errorMsg').show();
							$("#cvWrite").addClass('has-error');
						}
					}
				}
			}
		});
		
		

		// Question 1 To hide for version 4
		/*
		$.each(ques1, function() {
			if (this.checked)
				ques1Str = this.value;
				
			if(ques1Str == '' || ques1Str == undefined){
				if(errorList.find('.errormessage-ques1').length == 0){
					$('<li />', {html: 'Ben je in het bezit van een Heftruckcertificaat?', class : 'col-sm-6 errormessage-ques1'})
					.appendTo(errorList)
					.click(function(){
						$('html, body').animate({
							scrollTop: $("#ques1container").offset().top - 100
						}, 500);
					});
					//$('#errorMsg').show();
					ques1.parent().parent().parent().addClass('has-error');
				}
			}else{
				if(ques1.parent().parent().parent().hasClass('has-error')){
					ques1.parent().parent().parent().removeClass('has-error')
				};
				if(errorList.find('.errormessage-ques1').length > 0){
					errorList.find('.errormessage-ques1').remove();
					//$('#errorMsg').hide();
				}
				//localStorage.setItem('logQues1', ques1Str);
			}
		});
		
		// Experiance
		if(	parseInt($('#xp option:selected').val()) == 0 ){
			if(errorList.find('.errormessage-xp').length == 0){
				$('<li />', {html: 'Hoeveel jaar heb je ervaring als heftruckchauffeur?', class : 'col-sm-6 errormessage-xp'})
				.appendTo(errorList)
				.click(function(){
					$('html, body').animate({
						scrollTop: $("#xp").offset().top - 100
					}, 500);
					$('#xp').focus();
				});
				//$('#errorMsg').show();
				$('#xp').parent().parent().addClass('has-error');
			}
		}else{
			if($('#xp').parent().parent().hasClass('has-error')){
				$('#xp').parent().parent().removeClass('has-error')
			};

			if(errorList.find('.errormessage-xp').length > 0){
				errorList.find('.errormessage-xp').remove();
				//$('#errorMsg').hide();
			}

			//localStorage.setItem('logQues2', $('#xp option:selected').val());
		}
		*/
		$.each(moreHelp, function() {
			if (this.checked)
				moreHelpStr = this.value;
				
			if(moreHelpStr == '' || moreHelpStr == null || moreHelpStr == undefined){
				if(errorList.find('.errormessage-moreHelp').length == 0){
					$('<li />', {html: 'Waarvan moet Olympia jou op de hoogte houden:', class : 'col-sm-6 errormessage-moreHelp'}).
					appendTo(errorList)
					.click(function(){
						$('html, body').animate({
							scrollTop: $("#botChk").offset().top - 100
						}, 500);
						$('#botChk').focus();
					});
					//$('#errorMsg').show();
					moreHelp.parent().parent().parent().parent().parent().addClass('has-error');
				}
			}else{
				if(moreHelp.parent().parent().parent().parent().parent().hasClass('has-error')){
					moreHelp.parent().parent().parent().parent().parent().removeClass('has-error')
				};
				if(errorList.find('.errormessage-moreHelp').length > 0){
					errorList.find('.errormessage-moreHelp').remove();
					//$('#errorMsg').hide();
				}
				//localStorage.setItem('logMoreHelp', moreHelpStr);
			}
		});

		if(terms.is(':checked') == true){
			if(terms.parent().parent().parent().parent().parent().hasClass('has-error')){
				terms.parent().parent().parent().parent().parent().removeClass('has-error')
			};
			if(errorList.find('.errormessage-terms').length > 0){
				errorList.find('.errormessage-terms').remove();
				//$('#errorMsg').hide();
			}
		}else{
			if(errorList.find('.errormessage-terms').length == 0){
				$('<li />', {html: 'Ga je akkoord met de privacy verklaring?', class : 'col-sm-6 errormessage-terms'})
				.appendTo(errorList)
				.click(function(){
					$('html, body').animate({
						scrollTop: terms.offset().top - 100
					}, 500);
					terms.focus();
				});
				//$('#errorMsg').show();
				terms.parent().parent().parent().parent().parent().addClass('has-error');
			}
		}

		if(errorList.children('li').length > 0){
			$('#errorMsg').show();
			$('html, body').animate({
				scrollTop: 200
			}, 500);
		}else{
			$('#errorMsg').hide();
			$('html, body').animate({
				scrollTop: 1600
			}, 500);
			//to enable job selection 3 
			$('#jobForm-section3').removeClass('grey-link');
			$('#jobForm-section3 ul li').removeClass('grey-link');
			$('#jobForm-section3 ul li span').removeClass('grey-link');
			$('#jobForm-section3').find('button[type=button]').removeClass('btn-default').addClass('btn-primary');
			$('#jobForm-section3 :input').prop("disabled", false);
		}
		
	});
	//-------------------

	$('#tooltip1').popover({
		container: 'body',
		html: true
	})
	.css({'cursor': 'pointer'});

	$(document).click(function (e) {
		$('#tooltip1').each(function () {
			if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
				//$(this).popover('hide');
				if ($(this).data('bs.popover').tip().hasClass('in')) {
					$(this).popover('toggle');
				}
				
				return;
			}
		});
	});

	$('#tooltip2').popover({
		container: 'body',
		html: true
	})
	.css({'cursor': 'pointer'});

	$(document).click(function (e) {
		$('#tooltip2').each(function () {
			if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
				//$(this).popover('hide');
				if ($(this).data('bs.popover').tip().hasClass('in')) {
					$(this).popover('toggle');
				}
				
				return;
			}
		});
	});
});

$(document).ready(function(){
	$('#text-content').on('blur', function () {
		$('#zoomTextarea').removeClass('foucs-color-text')
	}).on('focus', function () {
		$('#zoomTextarea').addClass('foucs-color-text')
	});
});


var GlobalVariable1 = '';
var GlobalVariable2 = '';
function deleteMe(obj){
	var $this = $(obj);
	$this.closest('li').remove();
}

function editMe(obj){
	var $this = $(obj);
	GlobalVariable1 = $this;
	var // cache variables
	functie1 = $('#pop-functie1'),
	bedrijf1 = $('#pop-bedrijf1'),
	vestigingsplaats1 = $('#pop-Vestigingsplaats1'),
	startMonth11 = $('#pop-startdatum-maand-11'),
	startYear11 = $('#pop-startdatum-jaar-11'),
	endMonth11 = $('#pop-einddatum-maand-11'),
	endYear11 = $('#pop-einddatum-jaar-11'),
	funtieBeschrijving1 = $('#FuntieBeschrijving1');

	var // localstorage
	functie1Str,
	bedrijfStr,
	vestigingsplaatsStr,
	startMonth1Str,
	startYear1Str,
	endMonth1Str,
	endYear1Str,
	funtieBeschrijvingStr;

	var closestHead = $this.closest('.heading');

	functie1.val(closestHead.find('.functie').html());
	bedrijf1.val(closestHead.find('.bedrijf').html());
	vestigingsplaats1.val("Lorem ipsum dolor set");
	startMonth11.val(closestHead.find('.startDate').html());
	startYear11.val(closestHead.find('.startYear').html());
	endMonth11.val(closestHead.find('.endDate').html());
	endYear11.val(closestHead.find('.endYear').html());
	funtieBeschrijving1.val('Lorem ipsum dolor sit amet, qui evertitur theophrastus no, per quot regione labores ex. Ne dicant minimum duo, aperiam voluptatum vituperatoribus mea id, sit latine eligendi persecuti eu.');

	$("#pastWorkEdit").modal("show");
}
$(document).ready(function(){
	
	$('#manual-xp-edit').click(function(){

		var // cache variables
		functie1 = $('#pop-functie1'),
		bedrijf1 = $('#pop-bedrijf1'),
		vestigingsplaats1 = $('#pop-Vestigingsplaats1'),
		startMonth11 = $('#pop-startdatum-maand-11'),
		startYear11 = $('#pop-startdatum-jaar-11'),
		endMonth11 = $('#pop-einddatum-maand-11'),
		endYear11 = $('#pop-einddatum-jaar-11'),
		funtieBeschrijving1 = $('#FuntieBeschrijving1');

		var // localstorage
		functie1Str,
		bedrijfStr,
		vestigingsplaatsStr,
		startMonth1Str,
		startYear1Str,
		endMonth1Str,
		endYear1Str,
		funtieBeschrijvingStr;


		if(functie1.val() == '' || functie1.val() == null){
			functie1.parent().parent().addClass('has-error');
		}else{
			if(functie1.parent().parent().hasClass('has-error')){
				functie1.parent().parent().removeClass('has-error')
			};
			functie1Str = functie1.val();
		}

		if(bedrijf1.val() == '' || bedrijf1.val() == null){
			bedrijf1.parent().parent().addClass('has-error');
		}else{
			if(bedrijf1.parent().parent().hasClass('has-error')){
				bedrijf1.parent().parent().removeClass('has-error')
			};
			bedrijfStr = bedrijf1.val();
		}

		if(vestigingsplaats1.val() == '' || vestigingsplaats1.val() == null){
			vestigingsplaats1.parent().parent().addClass('has-error');
		}else{
			if(vestigingsplaats1.parent().parent().hasClass('has-error')){
				vestigingsplaats1.parent().parent().removeClass('has-error')
			};
			vestigingsplaatsStr = vestigingsplaats1.val();
		}

		if(funtieBeschrijving1.val() == '' || funtieBeschrijving1.val() == null){
			funtieBeschrijving1.parent().parent().addClass('has-error');
		}else{
			if(funtieBeschrijving1.parent().parent().hasClass('has-error')){
				funtieBeschrijving1.parent().parent().removeClass('has-error')
			};
			funtieBeschrijvingStr = funtieBeschrijving1.val();
		}

		if($('#pop-startdatum-maand-11 option:selected').val() == 0){
			$('#pop-startdatum-maand-11').parent().parent().parent().parent().addClass('has-error');
		}else{
			if($('#pop-startdatum-maand-11').parent().parent().parent().parent().hasClass('has-error')){
				$('#pop-startdatum-maand-11').parent().parent().parent().parent().removeClass('has-error')
			};
			startMonth1Str = $('#pop-startdatum-maand-11 option:selected').val()
		}

		if($('#pop-startdatum-jaar-11 option:selected').val() == 0){
			$('#pop-startdatum-jaar-11').parent().parent().parent().parent().addClass('has-error');
		}else{
			if($('#pop-startdatum-jaar-11').parent().parent().parent().parent().hasClass('has-error')){
				$('#pop-startdatum-jaar-11').parent().parent().parent().parent().removeClass('has-error')
			};
			startYear1Str = $('#pop-startdatum-jaar-11 option:selected').val();
		}

		if($('#pop-einddatum-maand-11 option:selected').val() == 0){
			$('#pop-einddatum-maand-11').parent().parent().parent().addClass('has-error');
		}else{
			if($('#pop-einddatum-maand-11').parent().parent().parent().parent().hasClass('has-error')){
				$('#pop-einddatum-maand-11').parent().parent().parent().parent().removeClass('has-error')
			};
			endMonth1Str = $('#pop-einddatum-maand-11 option:selected').val();
		}

		if($('#pop-einddatum-jaar-11 option:selected').val() == 0){
			$('#pop-einddatum-jaar-11').parent().parent().parent().parent().addClass('has-error');
		}else{
			if($('#pop-einddatum-jaar-11').parent().parent().parent().parent().hasClass('has-error')){
				$('#pop-einddatum-jaar-11').parent().parent().parent().parent().removeClass('has-error')
			};
			endYear1Str = $('#pop-einddatum-jaar-11 option:selected').val();
		}

		if(
			$('#pop-einddatum-jaar-11 option:selected').val() == 0 ||
			$('#pop-einddatum-maand-11 option:selected').val() == 0 ||
			$('#pop-startdatum-jaar-11 option:selected').val() == 0 ||
			$('#pop-startdatum-maand-11 option:selected').val() == 0 ||
			functie1.val() == '' ||
			funtieBeschrijving1.val() == '' ||
			vestigingsplaats1.val() == '' || bedrijf1.val() == '' ){
			return false;
		}else{
			deleteMe(GlobalVariable1);
			$('#addDeleteWerkervaring').append(
				'<li>'+
					'<div class="heading">'+
						'<span><span class="startDate">'+ startMonth1Str +'</span>-<span class="startYear">'+ startYear1Str +'</span>  -  <span class="endDate">'+ endMonth1Str +'</span>-<span class="endYear">'+ endYear1Str+ '</span>, <span class="functie">'+functie1Str+'</span>, <span class="bedrijf">'+bedrijfStr+'</span></span>'+
						'<span class="pull-right"><a href="javascript:void(0)" onclick="editMe(this)">bewerk</a>&nbsp;&nbsp; <a href="javascript:void(0)" onclick="deleteMe(this)">verwijderen</a></span>'+
					'</div>'+
				'</li>'
			);
			$('#pastWorkEdit').modal('hide');
		}

	});

})

$(document).ready(function(){
	// $('#pastwork-info-container').hide();

	var id = 0;

	$('#manual-xp-add').click(function(){
		
		id += 1;
		
		var // cache variables
		functie1 = $('#pop-functie'),
		bedrijf = $('#pop-bedrijf'),
		vestigingsplaats = $('#pop-Vestigingsplaats'),
		startMonth1 = $('#pop-startdatum-maand-1'),
		startYear1 = $('#pop-startdatum-jaar-1'),
		endMonth1 = $('#pop-einddatum-maand-1'),
		endYear1 = $('#pop-einddatum-jaar-1'),
		funtieBeschrijving = $('#FuntieBeschrijving');

		var // localstorage
		functie1Str,
		bedrijfStr,
		vestigingsplaatsStr,
		startMonth1Str,
		startYear1Str,
		endMonth1Str,
		endYear1Str,
		funtieBeschrijvingStr;


		if(functie1.val() == '' || functie1.val() == null){
			functie1.parent().parent().addClass('has-error');
		}else{
			if(functie1.parent().parent().hasClass('has-error')){
				functie1.parent().parent().removeClass('has-error')
			};
			functie1Str = functie1.val();
		}

		if(bedrijf.val() == '' || bedrijf.val() == null){
			bedrijf.parent().parent().addClass('has-error');
		}else{
			if(bedrijf.parent().parent().hasClass('has-error')){
				bedrijf.parent().parent().removeClass('has-error')
			};
			bedrijfStr = bedrijf.val();
		}

		if(vestigingsplaats.val() == '' || vestigingsplaats.val() == null){
			vestigingsplaats.parent().parent().addClass('has-error');
		}else{
			if(vestigingsplaats.parent().parent().hasClass('has-error')){
				vestigingsplaats.parent().parent().removeClass('has-error')
			};
			vestigingsplaatsStr = vestigingsplaats.val();
		}

		if(funtieBeschrijving.val() == '' || funtieBeschrijving.val() == null){
			funtieBeschrijving.parent().parent().addClass('has-error');
		}else{
			if(funtieBeschrijving.parent().parent().hasClass('has-error')){
				funtieBeschrijving.parent().parent().removeClass('has-error')
			};
			funtieBeschrijvingStr = funtieBeschrijving.val();
		}

		if($('#pop-startdatum-maand-1 option:selected').val() == 0){
			$('#pop-startdatum-maand-1').parent().parent().parent().parent().addClass('has-error');
		}else{
			if($('#pop-startdatum-maand-1').parent().parent().parent().parent().hasClass('has-error')){
				$('#pop-startdatum-maand-1').parent().parent().parent().parent().removeClass('has-error')
			};
			startMonth1Str = $('#pop-startdatum-maand-1 option:selected').val()
		}

		if($('#pop-startdatum-jaar-1 option:selected').val() == 0){
			$('#pop-startdatum-jaar-1').parent().parent().parent().parent().addClass('has-error');
		}else{
			if($('#pop-startdatum-jaar-1').parent().parent().parent().parent().hasClass('has-error')){
				$('#pop-startdatum-jaar-1').parent().parent().parent().parent().removeClass('has-error')
			};
			startYear1Str = $('#pop-startdatum-jaar-1 option:selected').val();
		}

		if($('#pop-einddatum-maand-1 option:selected').val() == 0){
			$('#pop-einddatum-maand-1').parent().parent().parent().addClass('has-error');
		}else{
			if($('#pop-einddatum-maand-1').parent().parent().parent().parent().hasClass('has-error')){
				$('#pop-einddatum-maand-1').parent().parent().parent().parent().removeClass('has-error')
			};
			endMonth1Str = $('#pop-einddatum-maand-1 option:selected').val();
		}

		if($('#pop-einddatum-jaar-1 option:selected').val() == 0){
			$('#pop-einddatum-jaar-1').parent().parent().parent().parent().addClass('has-error');
		}else{
			if($('#pop-einddatum-jaar-1').parent().parent().parent().parent().hasClass('has-error')){
				$('#pop-einddatum-jaar-1').parent().parent().parent().parent().removeClass('has-error')
			};
			endYear1Str = $('#pop-einddatum-jaar-1 option:selected').val();
		}

		if(
			$('#pop-einddatum-jaar-1 option:selected').val() == 0 ||
			$('#pop-einddatum-maand-1 option:selected').val() == 0 ||
			$('#pop-startdatum-jaar-1 option:selected').val() == 0 ||
			$('#pop-startdatum-maand-1 option:selected').val() == 0 ||
			functie1.val() == '' ||
			funtieBeschrijving.val() == '' ||
			vestigingsplaats.val() == '' || bedrijf.val() == '' ){
			return false;
		}else{
			$('#addDeleteWerkervaring').append(
				'<li>'+
					'<div class="heading">'+
						'<span><span class="startDate">'+ startMonth1Str +'</span>-<span class="startYear">'+ startYear1Str +'</span>  -  <span class="endDate">'+ endMonth1Str +'</span>-<span class="endYear">'+ endYear1Str+ '</span>, <span class="functie">'+functie1Str+'</span>, <span class="bedrijf">'+bedrijfStr+'</span></span>'+
						'<span class="pull-right"><a href="javascript:void(0)" onclick="editMe(this)">bewerk</a>&nbsp;&nbsp; <a href="javascript:void(0)" onclick="deleteMe(this)">verwijderen</a></span>'+
					'</div>'+
				'</li>'
			);
			
			$('#pastWork').modal('hide');
			

			$('#past-job input, #past-job select, #past-job textarea').each(function() {
				var input = $(this);
				if(input !== '') {
					input.val("");
				}
			});
		}
	});
});

function editMeEdu(obj){
	var $this = $(obj);
	GlobalVariable2 = $this;
	var // cache variables
	diploma1 = $('input[name="pop-diploma1"]'),
	opleding1 = $('#pop-edu-opleiding1'),
	startMonth21 = $('#pop-start-month1'),
	startYear21 = $('#pop-start-year1'),
	endMonth21 = $('#pop-end-month1'),
	endYear21 = $('#pop-end-year1');

	var // localstorage
	diplomaStr,
	opledingStr,
	startMonth2Str,
	startYear2Str,
	endMonth2Str,
	endYear2Str;

	var closestHead = $this.closest('.heading');

	//diploma1.val(closestHead.find('.yes-no').html());
	$('input[name="pop-diploma1"][value="' + closestHead.find('.yes-no').html() + '"]').prop('checked', true);
	opleding1.val(closestHead.find('.edu-opleiding').html());
	startMonth21.val(closestHead.find('.startDate').html());
	startYear21.val(closestHead.find('.startYear').html());
	endMonth21.val(closestHead.find('.endDate').html());
	endYear21.val(closestHead.find('.endYear').html());

	$("#educationPopEdit").modal("show");
}

$(document).ready(function(){
	$('#manual-edu-add').click(function(){
		var // cache variables
		diploma = $('input[name="pop-diploma"]'),
		opleding = $('#pop-edu-opleiding'),
		startMonth2 = $('#pop-start-month'),
		startYear2 = $('#pop-start-year'),
		endMonth2 = $('#pop-end-month'),
		endYear2 = $('#pop-end-year');

		var // localstorage
		diplomaStr,
		opledingStr,
		startMonth2Str,
		startYear2Str,
		endMonth2Str,
		endYear2Str;


		if(opleding.val() == '' || opleding.val() == null){
			opleding.parent().parent().addClass('has-error');
		}else{
			if(opleding.parent().parent().hasClass('has-error')){
				opleding.parent().parent().removeClass('has-error')
			};
			opledingStr = opleding.val();
		}

		if( $('input[name="pop-diploma"]:checked').val() == '' || $('input[name="pop-diploma"]:checked').val() == null){
			diploma.parent().parent().parent().addClass('has-error');
		}else{
			if(diploma.parent().parent().hasClass('has-error')){
				diploma.parent().parent().removeClass('has-error')
			};
			diplomaStr = $('input[name="pop-diploma"]:checked').val();
		}

		if($('#pop-start-month option:selected').val() == 0){
			$('#pop-start-month').parent().parent().parent().parent().addClass('has-error');
		}else{
			if($('#pop-start-month').parent().parent().parent().parent().hasClass('has-error')){
				$('#pop-start-month').parent().parent().parent().parent().removeClass('has-error')
			};
			startMonth2Str = $('#pop-start-month option:selected').val();
		}

		if($('#pop-start-year option:selected').val() == 0){
			$('#pop-start-year').parent().parent().parent().parent().addClass('has-error');
		}else{
			if($('#pop-start-year').parent().parent().parent().parent().hasClass('has-error')){
				$('#pop-start-year').parent().parent().parent().parent().removeClass('has-error')
			};
			startYear2Str = $('#pop-start-year option:selected').val();
		}

		if($('#pop-end-month option:selected').val() == 0){
			$('#pop-end-month').parent().parent().parent().addClass('has-error');
		}else{
			if($('#pop-end-month').parent().parent().parent().parent().hasClass('has-error')){
				$('#pop-end-month').parent().parent().parent().parent().removeClass('has-error')
			};
			endMonth2Str = $('#pop-end-month option:selected').val();
		}

		if($('#pop-end-year option:selected').val() == 0){
			$('#pop-end-year').parent().parent().parent().parent().addClass('has-error');
		}else{
			if($('#pop-end-year').parent().parent().parent().parent().hasClass('has-error')){
				$('#pop-end-year').parent().parent().parent().parent().removeClass('has-error')
			};
			endYear2Str = $('#pop-end-year option:selected').val();
		}

		if(
			$('#pop-end-year option:selected').val() == 0 ||
			$('#pop-end-month option:selected').val() == 0 ||
			$('#pop-start-month option:selected').val() == 0 ||
			$('#pop-start-year option:selected').val() == 0 ||
			opleding.val() == '' ||
			diploma.val() == ''){
			return false;
		}else{
			$('#addDeleteEducation').append(
				'<li>'+
					'<div class="heading">'+
						'<span><span class="startDate">'+startMonth2Str+'</span>-<span class="startYear">'+startYear2Str+'</span>  -  <span class="endDate">'+endMonth2Str+'</span>-<span class="endYear">'+endYear2Str+'</span>, <span class="edu-opleiding">'+opledingStr +'</span>, <span class="yes-no">'+diplomaStr+'</span></span>'+
						'<span class="pull-right"><a href="javascript:void(0)" onclick="editMeEdu(this)">bewerk</a>&nbsp;&nbsp; <a href="javascript:void(0)" onclick="deleteMe(this)">verwijderen</a></span>'+
					'</div>'+
				'</li>'
			);
			$('#educationPopEdit').modal('hide');
		}
	});
});

$(document).ready(function(){

	$('#manual-edu-edit').click(function(){
		var // cache variables
		diploma = $('input[name="pop-diploma1"]'),
		opleding = $('#pop-edu-opleiding1'),
		startMonth2 = $('#pop-start-month1'),
		startYear2 = $('#pop-start-year1'),
		endMonth2 = $('#pop-end-month1'),
		endYear2 = $('#pop-end-year1');

		var // localstorage
		diplomaStr,
		opledingStr,
		startMonth2Str,
		startYear2Str,
		endMonth2Str,
		endYear2Str;


		if(opleding.val() == '' || opleding.val() == null){
			opleding.parent().parent().addClass('has-error');
		}else{
			if(opleding.parent().parent().hasClass('has-error')){
				opleding.parent().parent().removeClass('has-error')
			};
			opledingStr = opleding.val();
		}

		if( $('input[name="pop-diploma1"]:checked').val() == '' || $('input[name="pop-diploma1"]:checked').val() == null){
			diploma.parent().parent().parent().addClass('has-error');
		}else{
			if(diploma.parent().parent().hasClass('has-error')){
				diploma.parent().parent().removeClass('has-error')
			};
			diplomaStr = $('input[name="pop-diploma1"]:checked').val();
		}

		if($('#pop-start-month1 option:selected').val() == 0){
			$('#pop-start-month1').parent().parent().parent().parent().addClass('has-error');
		}else{
			if($('#pop-start-month1').parent().parent().parent().parent().hasClass('has-error')){
				$('#pop-start-month1').parent().parent().parent().parent().removeClass('has-error')
			};
			startMonth2Str = $('#pop-start-month1 option:selected').val();
		}

		if($('#pop-start-year1 option:selected').val() == 0){
			$('#pop-start-year1').parent().parent().parent().parent().addClass('has-error');
		}else{
			if($('#pop-start-year1').parent().parent().parent().parent().hasClass('has-error')){
				$('#pop-start-year1').parent().parent().parent().parent().removeClass('has-error')
			};
			startYear2Str = $('#pop-start-year1 option:selected').val();
		}

		if($('#pop-end-month1 option:selected').val() == 0){
			$('#pop-end-month1').parent().parent().parent().addClass('has-error');
		}else{
			if($('#pop-end-month1').parent().parent().parent().parent().hasClass('has-error')){
				$('#pop-end-month1').parent().parent().parent().parent().removeClass('has-error')
			};
			endMonth2Str = $('#pop-end-month1 option:selected').val();
		}

		if($('#pop-end-year1 option:selected').val() == 0){
			$('#pop-end-year1').parent().parent().parent().parent().addClass('has-error');
		}else{
			if($('#pop-end-year1').parent().parent().parent().parent().hasClass('has-error')){
				$('#pop-end-year1').parent().parent().parent().parent().removeClass('has-error')
			};
			endYear2Str = $('#pop-end-year1 option:selected').val();
		}

		if(
			$('#pop-end-year1 option:selected').val() == 0 ||
			$('#pop-end-month1 option:selected').val() == 0 ||
			$('#pop-start-month1 option:selected').val() == 0 ||
			$('#pop-start-year1 option:selected').val() == 0 ||
			opleding.val() == '' ||
			diploma.val() == ''){
			return false;
		}else{
			deleteMe(GlobalVariable2);
			$('#addDeleteEducation').append(
				'<li>'+
					'<div class="heading">'+
						'<span><span class="startDate">'+startMonth2Str+'</span>-<span class="startYear">'+startYear2Str+'</span>  -  <span class="endDate">'+endMonth2Str+'</span>-<span class="endYear">'+endYear2Str+'</span>, <span class="edu-opleiding">'+opledingStr +'</span>, <span class="yes-no">'+diplomaStr+'</span></span>'+
						'<span class="pull-right"><a href="javascript:void(0)" onclick="editMeEdu(this)">bewerk</a>&nbsp;&nbsp; <a href="javascript:void(0)" onclick="deleteMe(this)">verwijderen</a></span>'+
					'</div>'+
				'</li>'
			);
			$('#educationPopEdit').modal('hide');
		}
	});
});

var currentView = '';

//for form 3
$(document).ready(function(){
	$('#jobForm-section3').addClass('grey-link');
	$('#jobForm-section3 ul li').addClass('grey-link');
	$('#jobForm-section3 ul li span').addClass('grey-link');
	$('#jobForm-section3').find('button[type=button]').addClass('btn-default').removeClass('btn-primary');
	$('#jobForm-section3 :input').prop("disabled", true);

	$('.start-test').click(function(e) {
		window.location.href='callcentre-test.html'; 
	});
});

$(document).ready(function(){
	$('#saveVoorkeurenData').click(function(){
		var dienstverband = '',
			weekHour = '',
			branche = '',
			vakgebied = '',
			salaris = '',
			denkniveau = '',
			placeWithDistance = '',
			trefwoorden = '';
		
		//get the values
		if($('.dienstverband input[type=checkbox]:checked').length > 0){
			//something is selected
			$('.dienstverband input[type=checkbox]:checked').each(function() {
			  dienstverband += $(this).data("values") + ', ';
			});
			dienstverband = dienstverband.slice(0,-2);
			$("#dienstverband").text(dienstverband);
		}else{
			//to hide that particular li as nothing is selected
		}

		//get the values
		if($('.weekHour input[type=checkbox]:checked').length > 0){
			//something is selected
			$('.weekHour input[type=checkbox]:checked').each(function() {
			  weekHour += $(this).data("values") + ', ';
			});
			weekHour = weekHour.slice(0,-2);
			$("#weekHour").text(weekHour);
		}else{
			//to hide that particular li as nothing is selected
		}

		//get the values
		if($('.branche input[type=checkbox]:checked').length > 0){
			//something is selected
			$('.branche input[type=checkbox]:checked').each(function() {
			  branche += $(this).data("values") + ', ';
			});
			branche = branche.slice(0,-2);
			$("#branche").text(branche);
		}else{
			//to hide that particular li as nothing is selected
		}

		//get the values
		if($('.vakgebied input[type=checkbox]:checked').length > 0){
			//something is selected
			$('.vakgebied input[type=checkbox]:checked').each(function() {
			  vakgebied += $(this).data("values") + ', ';
			});
			vakgebied = vakgebied.slice(0,-2);
			$("#vakgebied").text(vakgebied);
		}else{
			//to hide that particular li as nothing is selected
		}

		//get the values
		if($('.salaris input[type=checkbox]:checked').length > 0){
			//something is selected
			$('.salaris input[type=checkbox]:checked').each(function() {
			  salaris += $(this).data("values") + ', ';
			});
			salaris = salaris.slice(0,-2);
			$("#salaris").text(salaris);
		}else{
			//to hide that particular li as nothing is selected
		}

		//get the values
		if($('.denkniveau input[type=radio]:checked').length > 0){
			//something is selected
			$('.denkniveau input[type=radio]:checked').each(function() {
			  denkniveau += $(this).data("values") + ', ';
			});
			denkniveau = denkniveau.slice(0,-2)
			$("#denkniveau").text(denkniveau)
		}else{
			//to hide that particular li as nothing is selected
		}

		//get the values
		if($(".placeWithDistance span strong").length > 0){
			$(".placeWithDistance span strong").each(function() {
			  placeWithDistance += $(this).text() + ', '
			});
			placeWithDistance = placeWithDistance.slice(0,-2);
			$("#placeWithDistance").text(placeWithDistance)
		}else{
			//to hide that particular li as nothing is selected
		}

		//get the values
		if($(".trefwoorden span strong").length > 0){
			$(".trefwoorden span strong").each(function() {
			  trefwoorden += $(this).text() + ', '
			});
			trefwoorden = trefwoorden.slice(0,-2);
			$("#trefwoorden").text(trefwoorden)
		}else{
			//to hide that particular li as nothing is selected
		}
		
		$(".voorkeuren-box").addClass('hidden');
		$(".alert-box").removeClass('hidden');
	})
});

function removeText(obj){
	$this = $(obj)
	$this.closest('span').remove();
}

$(document).ready(function(){
	$("#VoegToeDistance").click(function(){
		var place = $("#country_v1-query").val();
		var distance = $(".distance :selected").text();
		console.log(distance);
		var newString = '';
		if(place == null || place == ''){
			//value is empty
		}else{
			newString = place + " (" + distance + ") ";
			$(".placeWithDistance").append(
				'<span><strong>'+ newString +'</strong><a href="javascript:void(0)" onclick="removeText(this)"><i>&times;</i></a></span>'
			)
		}
	})
	$("#VoegToetrefwoorden").click(function(){
		var trefwoorden = $("#trefwoorden_v1-query").val();
		if(trefwoorden == null || trefwoorden == ''){
			//value is empty
		}else{
			$(".trefwoorden").append(
				'<span><strong>'+ trefwoorden +'</strong><a href="javascript:void(0)" onclick="removeText(this)"><i>&times;</i></a></span>'
			)
		}
	})
});
var $index = 5;
function emptyTheForm(){
	//replace the save button with update buttom
  	$('#updateVoorkeurenDataAlertPage').addClass('hidden');
  	$('#saveVoorkeurenDataAlertPage').removeClass('hidden');
  	$index++;
  	$(".voorkeuren-box").removeClass('hidden');
	$(".alert-box").addClass('hidden');

	$('.alertname').val('');
	$('.emailFreq input[type=radio], .denkniveau input[type=radio]').removeAttr('checked');
	$('.dienstverband input[type=checkbox], .weekHour input[type=checkbox], .branche input[type=checkbox], .vakgebied input[type=checkbox], .salaris input[type=checkbox]').removeAttr('checked');
	$('.trefwoorden span').remove();
	$('.placeWithDistance span').remove();
}
//email alert
$(document).ready(function(){
	$('#saveVoorkeurenDataAlertPage').click(function(){
		var alertname = '',
			dienstverband = '',
			weekHour = '',
			branche = '',
			vakgebied = '',
			salaris = '',
			denkniveau = '',
			placeWithDistance = '',
			trefwoorden = '',
			emailFreq = '';
		
		//get the values
		if($('.dienstverband input[type=checkbox]:checked').length > 0){
			//something is selected
			$('.dienstverband input[type=checkbox]:checked').each(function() {
			  dienstverband += $(this).data("values") + ', ';
			});
			dienstverband = dienstverband.slice(0,-2);
			//$("#dienstverband1").text(dienstverband);
		}else{
			//to hide that particular li as nothing is selected
			//$("#dienstverband1").closest('li').remove();
		}
		//get the values
		if($('.weekHour input[type=checkbox]:checked').length > 0){
			//something is selected
			$('.weekHour input[type=checkbox]:checked').each(function() {
			  weekHour += $(this).data("values") + ', ';
			});
			weekHour = weekHour.slice(0,-2);
			$("#weekHour1").text(weekHour);
		}else{
			//to hide that particular li as nothing is selected
			//$("#weekHour1").closest('li').remove();
		}

		//get the values
		if($('.branche input[type=checkbox]:checked').length > 0){
			//something is selected
			$('.branche input[type=checkbox]:checked').each(function() {
			  branche += $(this).data("values") + ', ';
			});
			branche = branche.slice(0,-2);
			//$("#branche1").text(branche);
		}else{
			//to hide that particular li as nothing is selected
			//$("#branche1").closest('li').remove();
		}

		//get the values
		if($('.vakgebied input[type=checkbox]:checked').length > 0){
			//something is selected
			$('.vakgebied input[type=checkbox]:checked').each(function() {
			  vakgebied += $(this).data("values") + ', ';
			});
			vakgebied = vakgebied.slice(0,-2);
			//$("#vakgebied1").text(vakgebied);
		}else{
			//to hide that particular li as nothing is selected
			//$("#vakgebied1").closest('li').remove();
		}

		//get the values
		if($('.salaris input[type=checkbox]:checked').length > 0){
			//something is selected
			$('.salaris input[type=checkbox]:checked').each(function() {
			  salaris += $(this).data("values") + ', ';
			});
			salaris = salaris.slice(0,-2);
			//$("#salaris1").text(salaris);
		}else{
			//to hide that particular li as nothing is selected
			//$("#salaris1").closest('li').remove();
		}

		//get the values
		if($('.denkniveau input[type=radio]:checked').length > 0){
			//something is selected
			$('.denkniveau input[type=radio]:checked').each(function() {
			  denkniveau += $(this).data("values") + ', ';
			});
			denkniveau = denkniveau.slice(0,-2)
			//$("#denkniveau1").text(denkniveau)
		}else{
			//to hide that particular li as nothing is selected
			//$("#denkniveau1").closest('li').remove();
		}

		//get the values
		if($('.emailFreq input[type=radio]:checked').length > 0){
			//something is selected
			$('.emailFreq input[type=radio]:checked').each(function() {
			  emailFreq += $(this).data("values") + ', ';
			});
			emailFreq = emailFreq.slice(0,-2)
			//$("#denkniveau1").text(denkniveau)
		}else{
			//to hide that particular li as nothing is selected
			//$("#denkniveau1").closest('li').remove();
		}

		//get the values
		if($(".placeWithDistance span strong").length > 0){
			$(".placeWithDistance span strong").each(function() {
			  placeWithDistance += $(this).text() + ', '
			});
			placeWithDistance = placeWithDistance.slice(0,-2);
			//$("#placeWithDistance1").text(placeWithDistance)
		}else{
			//to hide that particular li as nothing is selected
			//$("#placeWithDistance1").closest('li').remove();
		}

		//get the values
		if($(".trefwoorden span strong").length > 0){
			$(".trefwoorden span strong").each(function() {
			  trefwoorden += $(this).text() + ', '
			});
			trefwoorden = trefwoorden.slice(0,-2);
			//$("#trefwoorden1").text(trefwoorden)
		}else{
			//to hide that particular li as nothing is selected
			//$("#trefwoorden1").closest('li').remove();
		}

		alertname = $(".alertname").val();
		$(".alerts").append(
			'<li id="'+$index+'">'+
				'<div class="header">'+
					'<div class="form-group" id="fromTO">'+
						'<div class="switch on">'+
						    '<input class="special-toggle" type="checkbox" name="toggleButton'+alertname+'" id="toggleButton'+alertname+'">'+
						   	'<label for="toggleButton'+alertname+'">'+
							    '<span></span>'+
							    '<span></span>'+
						    '</label>'+
						'</div>'+
					'</div>'+
					'<div class="job-title" onclick="toggleView(this)">'+
						'<strong id="alertname">'+alertname+'</strong >'+
						'<span class="olympia-icon olympia-caret-down pull-right"></span>'+
					'</div>'+
				'</div>'+
				'<div class="job-body">'+
					'<ul>'+
						'<li class="functies">'+
							'<strong>Functies / trefwoorden:</strong>'+
							'<span id="trefwoorden"> '+trefwoorden+'</span>'+
						'</li>'+
						'<li class="locatie">'+
							'<strong>Locatie en afstand:</strong>'+
							'<span id="placeWithDistance1"> '+placeWithDistance+'</span>'+
						'</li>'+
						'<li class="uren">'+
							'<strong>Uren per week:</strong>'+
							'<span id="weekHour1"> '+weekHour+'</span>'+
						'</li>'+
						'<li class="dienstverband">'+
							'<strong>Dienstverband:</strong>'+
							'<span id="dienstverband1"> '+dienstverband+'</span>'+
						'</li>'+
						'<li class="salary">'+
							'<strong>Salaris:</strong>'+
							'<span id="salaris1"> '+salaris+'</span>'+
						'</li>'+
						'<li class="werkand">'+
							'<strong>Werk-en denkniveau:</strong>'+
							'<span id="denkniveau1"> '+denkniveau+'</span>'+
						'</li>'+
						'<li class="vakgebied">'+
							'<strong>Vakgebied:</strong>'+
							'<span id="vakgebied1"> '+vakgebied+'</span>'+
						'</li>'+
						'<li class="branch">'+
							'<strong>Branche:</strong> '+
							'<span id="branche1"> '+branche+'</span>'+
						'</li>'+
						'<li>'+
							'<strong>&nbsp;</strong>'+
							'<span>&nbsp;</span>'+
						'</li>'+
						'<li class="frequency">'+
							'<strong>Frequentie:</strong>'+
							'<span> '+emailFreq+'</span>'+
						'</li>'+
					'</ul>'+
					'<span class="bewerk" onclick="editEmailAlert('+$index+')"><i class="olympia-icon olympia-edit"></i><a href="javascript:void(0)">E-mail alert instellingen bewerken</a></span>'+
					'<span class="bewerk" onclick="deleteThisEmailAlert(this)"><i class="olympia-icon olympia-trash-o"></i><a href="javascript:void(0)">E-mail alert verwijderen</a></span>'+
				'</div>'+
			'</li>'
		)

		$(".voorkeuren-box").addClass('hidden');
		$(".alert-box").removeClass('hidden');
	})
	$('#updateVoorkeurenDataAlertPage').click(function(){
		var alertname = '',
		dienstverband = '',
		weekHour = '',
		branche = '',
		vakgebied = '',
		salaris = '',
		denkniveau = '',
		placeWithDistance = '',
		trefwoorden = '',
		emailFreq = '';
		
		//get the values
		if($('.alertname').length > 0){
			alertname = $('.alertname').val();
		}
		//get the values
		if($('.dienstverband input[type=checkbox]:checked').length > 0){
			//something is selected
			$('.dienstverband input[type=checkbox]:checked').each(function() {
			  dienstverband += $(this).data("values") + ', ';
			});
			dienstverband = dienstverband.slice(0,-2);
		}
		//get the values
		if($('.weekHour input[type=checkbox]:checked').length > 0){
			//something is selected
			$('.weekHour input[type=checkbox]:checked').each(function() {
			  weekHour += $(this).data("values") + ', ';
			});
			weekHour = weekHour.slice(0,-2);
			$("#weekHour1").text(weekHour);
		}
		//get the values
		if($('.branche input[type=checkbox]:checked').length > 0){
			//something is selected
			$('.branche input[type=checkbox]:checked').each(function() {
			  branche += $(this).data("values") + ', ';
			});
			branche = branche.slice(0,-2);
		}
		//get the values
		if($('.vakgebied input[type=checkbox]:checked').length > 0){
			//something is selected
			$('.vakgebied input[type=checkbox]:checked').each(function() {
			  vakgebied += $(this).data("values") + ', ';
			});
			vakgebied = vakgebied.slice(0,-2);
		}
		//get the values
		if($('.salaris input[type=checkbox]:checked').length > 0){
			//something is selected
			$('.salaris input[type=checkbox]:checked').each(function() {
			  salaris += $(this).data("values") + ', ';
			});
			salaris = salaris.slice(0,-2);
		}
		//get the values
		if($('.denkniveau input[type=radio]:checked').length > 0){
			//something is selected
			$('.denkniveau input[type=radio]:checked').each(function() {
			  denkniveau += $(this).data("values") + ', ';
			});
			denkniveau = denkniveau.slice(0,-2);
		}
		//get the values
		if($('.emailFreq input[type=radio]:checked').length > 0){
			//something is selected
			$('.emailFreq input[type=radio]:checked').each(function() {
			  emailFreq += $(this).data("values") + ', ';
			});
			emailFreq = emailFreq.slice(0,-2);
		}

		//get the values
		if($(".placeWithDistance span strong").length > 0){
			$(".placeWithDistance span strong").each(function() {
			  placeWithDistance += $(this).text() + ', '
			});
			placeWithDistance = placeWithDistance.slice(0,-2);
		}

		//get the values
		if($(".trefwoorden span strong").length > 0){
			$(".trefwoorden span strong").each(function() {
			  trefwoorden += $(this).text() + ', '
			});
			trefwoorden = trefwoorden.slice(0,-2);
		}
		var obj = $('#clickedIdparam').val();
		var $parent = $('#'+obj);
		$parent.find('.job-title strong').text(alertname);
		$parent.find('.functies span').text(trefwoorden);
		$parent.find('.locatie span').text(placeWithDistance);
		$parent.find('.uren span').text(weekHour);
		$parent.find('.dienstverband span').text(dienstverband);
		$parent.find('.salary span').text(salaris);
		$parent.find('.werkand span').text(denkniveau);
		$parent.find('.vakgebied span').text(vakgebied);
		$parent.find('.branch span').text(branche);
		$parent.find('.frequency span').text(emailFreq);

		$(".voorkeuren-box").addClass('hidden');
		$(".alert-box").removeClass('hidden');
	})

	function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    var clickingId = getParameterByName('id');
    if(clickingId >= 2){
    	editEmailAlert(clickingId);
    }	
});
//delete email alert
function deleteThisEmailAlert(obj){
	var $this = $(obj); // This is the jQuery object being clicked

	console.log($this.parents('li.show'));
	$this.parents('li.show').remove();
}

//edit email alert
function editEmailAlert(obj){
	//empty the form first
	$('.alertname').val('');
	$('.emailFreq input[type=radio], .denkniveau input[type=radio]').removeAttr('checked');
	$('.dienstverband input[type=checkbox], .weekHour input[type=checkbox], .branche input[type=checkbox], .vakgebied input[type=checkbox], .salaris input[type=checkbox]').removeAttr('checked');
	$('.trefwoorden span').remove();
	$('.placeWithDistance span').remove();

	var $parent = $('#'+obj); // This is the jQuery object being clicked
	//get all the values
	var jobTitle,
		clickedId,
		jobBody,
		functies,
		locatiem,
		uren,
		dienstverband,
		salary,
		werkand,
		vakgebied,
		branch,
		frequency;

	jobTitle = $parent.find('.job-title strong').html();
	clickedId = $parent.attr('id');
	jobBody = $parent.find('.job-body');
	functies = jobBody.find('.functies span').html();
	locatie = jobBody.find('.locatie span').html();
	uren = jobBody.find('.uren span').html();
	salary = jobBody.find('.salary span').html();
	werkand = jobBody.find('.werkand span').html();
	vakgebied = jobBody.find('.vakgebied span').html();
	dienstverband = jobBody.find('.dienstverband span').html();
	branch = jobBody.find('.branch span').html();
	frequency = jobBody.find('.frequency span').html();

	$(".voorkeuren-box").removeClass('hidden');
	$(".alert-box").addClass('hidden');

	$("#clickedIdparam").val(obj);

	$('.alertname').val(jobTitle);
	$('.emailFreq input[value="'+frequency+'"]').prop('checked', true);
	dienstverband.split(',').forEach(function(frequency) {
    	$('.dienstverband input[data-values="'+frequency.trim()+'"]').prop('checked', true);
  	});
  	uren.split(',').forEach(function(weekhour) {
    	$('.weekHour input[data-values="'+weekhour.trim()+'"]').prop('checked', true);
  	});
  	branch.split(',').forEach(function(branch) {
  		$('.branche input[data-values="'+branch.trim()+'"]').prop('checked', true);
  	});
  	vakgebied.split(',').forEach(function(vakgebied) {
  		$('.vakgebied input[data-values="'+vakgebied.trim()+'"]').prop('checked', true);
  	});
  	salary.split(',').forEach(function(salary) {
  		$('.salaris input[data-values="'+salary.trim()+'"]').prop('checked', true);
  	});
  	werkand.split(',').forEach(function(werkand) {
  		$('.denkniveau input[data-values="'+werkand.trim()+'"]').prop('checked', true);
  	});
  	functies.split(',').forEach(function(functionName) {
  		$('.trefwoorden').append('<span><strong>'+functionName.trim()+'</strong><a href="javascript:void(0)" onclick="removeText(this)"><i>×</i></a></span>')
  	});
  	locatie.split(',').forEach(function(location) {
  		$('.placeWithDistance').append('<span><strong>'+location.trim()+' </strong><a href="javascript:void(0)" onclick="removeText(this)"><i>×</i></a></span>')
  	})

  	//replace the save button with update buttom
  	$('#updateVoorkeurenDataAlertPage').removeClass('hidden');
  	$('#saveVoorkeurenDataAlertPage').addClass('hidden');

}
