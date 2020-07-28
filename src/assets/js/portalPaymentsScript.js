function commafy(num) {
	var str = num.toString().split('.');

	if(str[0].length >= 4)
	{
		str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
	}
	if(str[1] && str[1].length >= 5)
	{
		str[1] = str[1].replace(/(\d{3})/g, '$1 ');
	}

	return str.join('.');
}

function mobileStyleChange() {

	if($(window).width() >= 769)
	{
		$('#mobileVersion').hide();
		$('#desktopVersion').show();
	}
	else
	{
		$('#mobileVersion').show();
		$('#desktopVersion').hide();
	}

}

function adminHover() {

	var plan = $('.plan');

	plan.siblings().attr('id', '');
	
	$(this).attr('id', 'most-popular');
}

$(document).on('click', '#mobile_credit_card_option', function(){
	$("#mobileCardForm").submit();
});

$(document).on('click', '#mobile_debit_card_option', function(){
	$("#mobileCardForm").submit();
});

$(document).on('click', '#mobile_debit_monthly_pay_option', function(){
	$("#mobileMonthlyForm").submit();
});

$(document).on('click', '#mobile_credit_monthly_pay_option', function(){
	$("#mobileMonthlyForm").submit();
});

$(document).on('click', '#desktop_credit_card_option', function(){
	$("#desktopCardForm").submit();
});

$(document).on('click', '#desktop_debit_card_option', function(){
	$("#desktopCardForm").submit();
});

$(document).on('click', '#desktop_debit_monthly_pay_option', function(){
	$("#desktopMonthlyForm").submit();
});

$(document).on('click', '#desktop_credit_monthly_pay_option', function(){
	$("#desktopMonthlyForm").submit();
});

$(document).ready(function () {

	mobileStyleChange();
	$(".plan").hover(adminHover);

	$("b.red_highlight").each(function (){

		var text = $(this).text();
		//First we check to see if it already has a comma
		if(text.indexOf(',') > -1 || text.indexOf(',') === -1)
		{
			//Then there is not a comma
			text = commafy(text);

			$(this).html(text);
		}

	});

	$("b.green_highlight").each(function (){

		var text = $(this).text();
		//First we check to see if it already has a comma
		if(text.indexOf(',') > -1 || text.indexOf(',') === -1)
		{
			//Then there is not a comma
			text = commafy(text);

			$(this).html(text);
		}
		
	});

	$("b.invoice_amount_details").each(function (){

		var text = $(this).text();
		//First we check to see if it already has a comma
		if(text.indexOf(',') > -1 || text.indexOf(',') === -1)
		{
			//Then there is not a comma
			text = commafy(text);

			$(this).html(text);
		}
		
	});

	$("div.green_highlight").each(function (){

		var text = $(this).text();
		//First we check to see if it already has a comma
		if(text.indexOf(',') > -1 || text.indexOf(',') === -1)
		{
			//Then there is not a comma
			text = commafy(text);

			$(this).html(text);
		}
		
	});
	

});

// This script takes place when the screen is resized for whatever reason
$(window).resize(function() {
    
    if( $(this).width() > 769 ) 
    {
        $('#mobileVersion').hide();
		$('#desktopVersion').show();
	}
	else
	{
		$('#mobileVersion').show();
		$('#desktopVersion').hide();
	}

});