// This validation method now works for sending the account information to the Web API
var encodedUsername = "bW9udGdvbWVyeV9jb3NjaWFfZ3JlX051OHBXa1lq";
// var payload = "{\"amount\": \"300\", \"card\": {\"name\": \"John Smith\",\"number\": \"4111111111111111\", \"cvv\": \"123\", \"exp_month\": \"10\", \"exp_year\": \"2019\"}, \"address\": {\"line1\": \"street\", \"city\": \"dagd\", \"state\": \"UT\", \"postal_code\": \"34343\"}}";
var signiture = $('input[name="paymentSigniture"]').val();

jQuery.fn.serializeObject = function() {
  var self = this,
            json = {},
            push_counters = {},
            patterns = {
                "validate": /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
                "key":      /[a-zA-Z0-9_]+|(?=\[\])/g,
                "push":     /^$/,
                "fixed":    /^\d+$/,
                "named":    /^[a-zA-Z0-9_]+$/
            };


        this.build = function(base, key, value){
            base[key] = value;
            return base;
        };

        this.push_counter = function(key){
            if(push_counters[key] === undefined){
                push_counters[key] = 0;
            }
            return push_counters[key]++;
        };

        $.each($(this).serializeArray(), function(){

            // skip invalid keys
            if(!patterns.validate.test(this.name)){
                return;
            }

            var k,
                keys = this.name.match(patterns.key),
                merge = this.value,
                reverse_key = this.name;

            while((k = keys.pop()) !== undefined){

                // adjust reverse_key
                reverse_key = reverse_key.replace(new RegExp("\\[" + k + "\\]$"), '');

                // push
                if(k.match(patterns.push)){
                    merge = self.build([], self.push_counter(reverse_key), merge);
                }

                // fixed
                else if(k.match(patterns.fixed)){
                    merge = self.build([], k, merge);
                }

                // named
                else if(k.match(patterns.named)){
                    merge = self.build({}, k, merge);
                }
            }

            json = $.extend(true, json, merge);
        });
		
		delete json['submitReviewForm'];
 		delete json['paymentToken'];
 		delete json['paymentSigniture'];
 		delete json['siteUrl'];
        
        return json;
};

// The iTransact AJAX Credit Card Processing Script
function creditCardTransaction() {

  var formData = JSON.stringify($('#card-review-form').serializeObject());

  console.log(formData);

  // IMPORTANT IMPORTANT IMPORTANT
  // One form should be for monthly ACH and the other one should be direct payment by MCG
  $.ajax({
      type: "POST",
      url: 'https://api.itransact.com/transactions',
      headers: {
      "authorization": encodedUsername + ':' + signiture,
      "content-type": "application/json"
  },
  processData: true, 
   // The slash in the below statement is so the code doesn't read in the quotation marks as a command, instead it is text. 
      data: formData,
      success: function(data) {
        console.log(date);
        console.log("Reaches here");
        // form.submit();        
      }
    });
}

// The RedPlanet XML Contract Creation Script (This calls xhrContractCreation within it)
function xhrLogin() {

  var data = "<FundML> 
                      <Version>1</Version> 
                      <Request> 
                          <Code>LogOn</Code>
                          <Online>Y</Online>        
                          <Broker> 
                              <Username>aj.larson@3pnc.com</Username>
                              <Password>Larsonaj</Password>            
                          </Broker> 
                      </Request> 
                  </FundML>";

  // var xmlData = "<FundML> 
  //                     <Version>1</Version> 
  //                     <Request> 
  //                         <Code>LogOn</Code>
  //                         <Online>Y</Online> 
  //                         <Broker> 
  //                             <Username>kevin.simms@mcggroup.com</Username>
  //                             <Password>Kevins</Password>            
  //                         </Broker> 
  //                     </Request> 
  //                 </FundML>";
 
  var xhr = new XMLHttpRequest();
   
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      // console.log(this.responseText);
    }
  });
   
  xhr.open("POST", "https://www.redplanetsoftware.com/odyssey/fundml.aspx");
     
  // overrideMimeType() can be used to force the response to be parsed as XML
  xhr.overrideMimeType('text/xml');

  xhr.onload = function () 
  {
    if (xhr.readyState === xhr.DONE) 
    {
      if (xhr.status === 200) 
      {
        // console.log(xhr.response);

        // This looks in the XML for the Session tag and then returns the value as a string
        var xmlResult = $('Session',xhr.response).text();
  
        xhrContractCreation(xmlResult);
      }
    }
  };
   
  xhr.send(data);
}

// After the login passes the Session Key this is called creating the Contract
// IMPORTANT NOTE: We have to maunually track each loan number and increment by one with each contract,
// then we have to store that contract number in a database so that it can be tracked. 
function xhrContractCreation(session_key) {

    // This is what I use to tirn the form into the tagged form
    // var formData = JSON.stringify($('#card-review-form').serializeObject());

    var data = "<FundML> 
                        <Version>1</Version> 
                        <Request> 
                            <Code>NewContract</Code>
                            <Session>" + session_key + "</Session> 
                            <Client>
                              <ABN>454545456</ABN>
                              <Name>Test Company LLC</Name>
                              <RegisteredName>TestComp</RegisteredName>
                              <BrokerID>TestComp</BrokerID>   
                                  <PostalAddress>
                                  <Address1></Address1>
                                  <Address2/>
                                  <Suburb></Suburb>
                                  <State></State>
                                  <Postcode></Postcode>
                              </PostalAddress>
                              <StreetAddress>
                                  <Address1>2500 Dallas Pkwy STE 300</Address1>
                                  <Address2/>
                                  <Suburb>Plano</Suburb>
                                  <State>TX</State>
                                  <Postcode>75093</Postcode>
                              </StreetAddress>
                              <Telephone>1234567890</Telephone>
                              <Fax></Fax>
                              <Email>test@test.com</Email>
                              <FSRAType></FSRAType>
                              <BankAccountOnly>12345678</BankAccountOnly>
                              <BankBSB>12345678</BankBSB>
                              <BankName>Westpac Banking Corp</BankName>
                              <BankBranch>George Street</BankBranch>
                              <Contact>
                                  <Name>Test User</Name>
                                  <Telephone>4698797001</Telephone>
                                  <Mobile>4698797001</Mobile>
                                  <Fax></Fax>
                                  <Email>test@test.com</Email>
                              </Contact>
                          </Client>
                           <InvoiceDetails>
                                   <InvoicesTotal>14500.00</InvoicesTotal>
                                   <InvoiceNumbers>999</InvoiceNumbers>
                            </InvoiceDetails>                   
                            <ContractDetails>
                                  <ContractReference/>
                                  <PaymentFrequency>M</PaymentFrequency>
                                  <ContractType>FEE</ContractType>
                                 <ContractVersion/>
                                 <CreatedDate>2017-10-17</CreatedDate>
                                 <TerminationDate/>
                                  <FirstInstalmentDate>2017-10-29</FirstInstalmentDate>
                                  <FirstInstalmentAmount>1398.96</FirstInstalmentAmount>
                                  <NumberOfInstalments>12</NumberOfInstalments>
                                  <RemainingInstalmentsAmount>1298.96</RemainingInstalmentsAmount>
                                  <AdminFee>100.00</AdminFee>
                                  <InterestCharges>987.50</InterestCharges>
                                  <TotalInvoices>14500.00</TotalInvoices>
                                  <TotalDueByClient>15587.50</TotalDueByClient>
                            </ContractDetails>
                        </Request> 
                    </FundML> ";
 
    var xhr = new XMLHttpRequest();
     
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        // console.log(this.responseText);
        
      }
    });
     
    xhr.open("POST", "https://www.redplanetsoftware.com/odyssey/fundml.aspx");
       
    // overrideMimeType() can be used to force the response to be parsed as XML
    xhr.overrideMimeType('text/xml');

    xhr.onload = function () 
    {
      if (xhr.readyState === xhr.DONE) 
      {
        if (xhr.status === 200) 
        {
          console.log(xhr.response);
          window.alert(xhr.response);
        }
      }
    };
     
    xhr.send(data);
}

// The old Contract Creation Script using AJAX 
function contractCreation(session_key){

  var xmlData = "<FundML> 
                        <Version>1</Version> 
                        <Request> 
                            <Code>NewContract</Code> 
                            <Online>Y</Online>
                            <Session>" + session_key + "</Session> 
                            <Client> 
                                <ABN>10987654321</ABN> 
                                <Name>OpenCut Mining</Name> 
                                <RegisteredName>Emerald Mines Pty Ltd</RegisteredName> 
                                <BrokerID>OPENCUT</BrokerID> 
                                <PostalAddress> 
                                    <Address1>PO Box 321</Address1> 
                                    <Address2/> 
                                    <Suburb>Melbourne</Suburb> 
                                    <State>VIC</State> 
                                    <Postcode>3000</Postcode> 
                                </PostalAddress> 
                                <StreetAddress> 
                                    <Address1>23 Smith Street</Address1> 
                                    <Address2/> 
                                    <Suburb>Collingwood</Suburb> 
                                    <State>VIC</State> 
                                    <Postcode>3056</Postcode> 
                                </StreetAddress> 
                                <Telephone>(03) 9222 1234</Telephone> 
                                <Fax>(03) 9222 4321</Fax> 
                                <Email>enquiries@opencut.com.au</Email> 
                                <FSRAType></FSRAType> 
                                <BankAccountOnly>12345678</BankAccountOnly> 
                                <BankBSB>12345678</BankBSB>
                                <BankName>Westpac Banking Corp</BankName> 
                                <BankBranch>George    Street</BankBranch> 
                                <Contact> 
                                    <Name>Stephen Adams</Name> 
                                    <Telephone>9222 1235</Telephone> 
                                    <Mobile>0412 222 5633</Mobile> 
                                    <Fax>9222 4322</Fax> 
                                    <Email>stephena@opencut.com.au</Email> 
                                </Contact> 
                            </Client> 
                             <InvoiceDetails>
                                     <InvoicesTotal>1500</InvoicesTotal>
                                     <InvoiceNumbers>123</InvoiceNumbers>
                              </InvoiceDetails>          
                              <ContractDetails> 
                                    <ContractReference>M00000456</ContractReference> 
                                    <PaymentFrequency>M</PaymentFrequency> 
                                   <ContractType>FEE</ContractType> 
                              <ContractVersion/> 
                              <CreatedDate>2017-10-04</CreatedDate> 
                              <TerminationDate/> 
                                    <FirstInstalmentDate>2017-10-29</FirstInstalmentDate> 
                                    <FirstInstalmentAmount>211.97</FirstInstalmentAmount> 
                                    <NumberOfInstalments>12</NumberOfInstalments> 
                                    <RemainingInstalmentsAmount>157.72</RemainingInstalmentsAmount> 
                                    <AdminFee>0.00</AdminFee> 
                                    <InterestCharges>0.00</InterestCharges> 
                                    <TotalInvoices>1892.64</TotalInvoices> 
                                    <TotalDueByClient>1892.64</TotalDueByClient>    
                              </ContractDetails> 
                        </Request> 
                    </FundML> 
                    ";

        
        // This is where we submit the xml to Redplanet with the Monthly Installment Form after log on
        $.ajax({
            type: "POST",
            url: 'https://www.redplanetsoftware.com/odyssey/fundml.aspx',
            contentType: "text/plain",
            // The slash in the below statement is so the code doesn't read in the quotation marks as a command, instead it is text. 
            data: xmlData,
            success: function(data) {
              
              console.log(data);
              // window.alert(xmlData);
              
              // form.submit();        
            }
          });
}

// This script is for: monthlyCardDetails.php
// This will correct the 
$("#monthly-payment-form").validate({
    errorClass:'error',
    validClass:'success',
    errorElement:'span',
  onkeyup: false,
  rules: 
  {
    "card[cvc]": {   
        cardCVC: !0,
        required: !0
    },
    "card[number]": {
        cardNumber: !0,
        required: !0
    },
    "card[expiry-year]": "cardExpiry"
  },
  submitHandler: function(form, event) {

  	event.preventDefault();

  	$('input[name="amount"]').val( ( $('input[name="amount"]').val() * 100.0 ) );

  	form.submit();
  },
});

$("#review-form").validate({
    errorClass:'error',
    validClass:'success',
    errorElement:'span',
  onkeyup: false,
  rules: {},
  submitHandler: function(form, event) {

  	event.preventDefault();

    xhrLogin();

    // This is where we log in to the Redplanet API and return the Session Key
    // var xmlData = "<FundML> 
    //                   <Version>1</Version> 
    //                   <Request> 
    //                       <Code>LogOn</Code>
    //                       <Online>Y</Online> 
    //                       <Broker> 
    //                           <Username>kevin.simms@mcggroup.com</Username>
    //                           <Password>Kevins</Password>            
    //                       </Broker> 
    //                   </Request> 
    //               </FundML>";

    // $.ajax({
    //     type: "POST",
    //     url: 'https://www.redplanetsoftware.com/odyssey/fundml.aspx',
    //     contentType: "text/plain",
    //     // dataType: "xml",
    //     // The slash in the below statement is so the code doesn't read in the quotation marks as a command, instead it is text. 
    //     data: xmlData,
    //     success: function(data) {
    //         console.log(data);
            
    //         var xmlResult = $('Session',data).text();

    //         console.log(xmlResult);

    //         contractCreation(xmlResult);

    //         // form.submit();        
    //     }
    // });
  },
});

/* This form will only be for Credit Card transaction and check payments on the full invoice
   so that means that this form will be using the iTransact script
*/
$("#card-review-form").validate({
    errorClass:'error',
    validClass:'success',
    errorElement:'span',
  onkeyup: false,
  rules: {},
  submitHandler: function(form, event) {

    event.preventDefault();

    creditCardTransaction();
  },
});