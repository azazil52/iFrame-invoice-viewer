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

// This will correct the color and ".00" of balance
function fixBalance(){
	
	$("div.balance").each(function(){
		var total = $(this).text();
		var test = "0.00";

		// This will adjust the color
		if (total === "0.00") 
		{
			$(this).css("color","green");
			$(this).text("$0.00");
		}
		else
		{
			$(this).css("color","red");
			$(this).html("$" + total);
		}

		// This will adjust the ".00" end
		var dotFlag = false;

		for(x = 0; x < total.length; x++)
		{
			if(total[x] == ".")
			{
				dotFlag = true;
				break;
			}
		}

		if(dotFlag == true)
		{
			$(this).html("$" + total);
		}
		else
		{
			$(this).html("$" + total + ".00");
		}
	});
}

function removeNegativeSign(){

	$("div.paid").each(function(){
		var text = $(this).text();
		var replaceText = "";

		for(x = 0; x < text.length; x++)
		{
			if(text[x] == '-')
			{
				continue;
			}

			replaceText += text[x];
		}

		$(this).text(replaceText);
	});

	$("#notification-paid").each(function(){
		var text = $(this).text();
		var replaceText = "";

		for(x = 0; x < text.length; x++)
		{
			if(text[x] == '-')
			{
				continue;
			}

			replaceText += text[x];
		}

		$(this).text(replaceText);
	});
}

function establishStatus(){
	var openHtml = "<b>Open</b>- No Payment";
	var partialHtml = "<b>Open</b>- Partial Payment";
	var closedHtml = "<b>Closed</b>- Full Payment";

	$("div.open_invoice").html(openHtml);
	$("div.partial_invoice").html(partialHtml);
	$("div.closed_invoice").html(closedHtml);
}

function checkChecked(){
	var count = 0;

	$("div.check").each(function(){

		if($(this).children().is(':checked'))
		{
			count++;
		}
	});

	if(count > 0)
	{
		$("div.error").html("<span></span>");
	}
	else
	{
		$("div.error").html("<span> No Invoices were selected</span>");
	}

}

function showPaidInvoices(){
    
    var thisTab = $('#tab2');
    var thatTab = $('#tab1');
    var thisContent = $('#section-flip-2');
    var thatContent = $('#section-flip-1');
    
    if(thisTab.hasClass('tab-current'))
    {
        thisTab.removeClass('tab-current');
        thatTab.addClass('tab-current');

        thisContent.removeClass('content-current');
        thatContent.addClass('content-current');

    }
    else
    {
    	thatTab.removeClass('tab-current');
        thisTab.addClass('tab-current');

        thatContent.removeClass('content-current');
        thisContent.addClass('content-current');
    }
}

function showUnpaidInvoices(){
    
    var thisTab = $('#tab1');
    var thatTab = $('#tab2');
    var thisContent = $('#section-flip-1');
    var thatContent = $('#section-flip-2');
    
    if(thisTab.hasClass('tab-current'))
    {
        thisTab.removeClass('tab-current');
        thatTab.addClass('tab-current');

        thisContent.removeClass('content-current');
        thatContent.addClass('content-current');

    }
    else
    {
    	thatTab.removeClass('tab-current');
        thisTab.addClass('tab-current');

        thatContent.removeClass('content-current');
        thisContent.addClass('content-current');
    }
}

function masterCheckBoxControl(){

	if($('#masterCheckbox').is(':checked'))
	{
		$('input[type="checkbox"]').prop("checked", true);
	}
	else
	{
		$('input[type="checkbox"]').prop("checked", false);
	}
}

// This is the functin that we us for the Amount count container dropdown
function dropdownTotalAmounts()
{
	// $('div.notification-container').slideDown();

	var dropdownCounts = $('#dropdown_id');
	var dropdownIcon = $('#dropdown_icon');
    
    if(dropdownCounts.hasClass('dropdown_closed'))
    {
        dropdownCounts.removeClass('dropdown_closed');
        dropdownCounts.addClass('dropdown_open');

        dropdownIcon.removeClass('fa-chevron-down');
        dropdownIcon.addClass('fa-chevron-up');


       $('div.notification-container').slideDown();

    }
    else if(dropdownCounts.hasClass('dropdown_open'))
    {
    	dropdownCounts.removeClass('dropdown_open');
        dropdownCounts.addClass('dropdown_closed');

        dropdownIcon.removeClass('fa-chevron-up');
        dropdownIcon.addClass('fa-chevron-down');

        $('div.notification-container').slideUp();
    }
}

$(document).on('click', 'div.count_dropdown', function(){
	dropdownTotalAmounts();
});

$(document).on('click', '#masterCheckbox', function(){
	masterCheckBoxControl();
});

// THESE ARE HERE FOR TESTING PURPOSES IT WILL NEED TO BE AUTOMATED
$(document).on('click', 'div.pay_invoices', function(){
	checkChecked();
});

$(document).on('click', 'div.export_list', function(){
	showPaidInvoices();
	showUnpaidInvoices();
});

// This will reveal the paid invoices
$(document).on('click', '#tab2', function(){
	showPaidInvoices();
});

$(document).on('click', '#tab1', function(){
	showUnpaidInvoices();
});

// for($i = 0; $i < 8; $i++)
// {
	
// }

$(document).on('click', 'div.btn_pay', function(){

	$(this).children('input[name="pay"]').trigger("click");

});


$(document).ready(function(){	

	establishStatus();
	fixBalance();
	removeNegativeSign();

	$("div.invNum").each(function(){
		var text = $(this).text();
		//First we check to see if it already has a comma
		if(text.indexOf(',') > -1 || text.indexOf(',') === -1)
		{
			//Then there is not a comma
			text = commafy(text);

			$(this).html(text);
		}
	});

	// This is a seperate function that removes "00:00:00"
	$("div.date").each(function(){
		var text = $(this).text();
		var position = text.indexOf(':');

		// To get rid of the two zeros after the colon
		position = position - 2;
		text = text.substring(0,position);

		$(this).html("<b>" + text + "</b>");
	});

	$("div.total").each(function(){
		var text = $(this).text();
		//First we check to see if it already has a comma
		if(text.indexOf(',') > -1 || text.indexOf(',') === -1)
		{
			//Then there is not a comma
			text = commafy(text);

			$(this).html(text);
		}
	});

	$("div.paid").each(function(){
		var text = $(this).text();
		//First we check to see if it already has a comma
		if(text.indexOf(',') > -1 || text.indexOf(',') === -1)
		{
			//Then there is not a comma
			text = commafy(text);

			$(this).html(text);
		}
	});

	$("div.balance").each(function(){
		var text = $(this).text();
		//First we check to see if it already has a comma
		if(text.indexOf(',') > -1 || text.indexOf(',') === -1)
		{
			//Then there is not a comma
			text = commafy(text);

			$(this).html('<b>' + text + '</b>');
		}
	});

	
	$("#notification-hours").each(function(){
		var text = $(this).text();
		//First we check to see if it already has a comma
		if(text.indexOf(',') > -1 || text.indexOf(',') === -1)
		{
			//Then there is not a comma
			text = commafy(text);

			$(this).html(text);
		}
	});
	
	$("#notification-total").each(function(){
		var text = $(this).text();
		//First we check to see if it already has a comma
		if(text.indexOf(',') > -1 || text.indexOf(',') === -1)
		{
			//Then there is not a comma
			text = commafy(text);

			$(this).html(text);
		}
	});
	
	$("#notification-paid").each(function(){
		var text = $(this).text();
		//First we check to see if it already has a comma
		if(text.indexOf(',') > -1 || text.indexOf(',') === -1)
		{
			//Then there is not a comma
			text = commafy(text);

			$(this).html(text);
		}
	});
	
	$("#notification-unpaid").each(function(){
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