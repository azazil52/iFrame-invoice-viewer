import { Component, OnInit, OnDestroy, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiConnectService } from './../api-connect.service';
import { fadeInAnimation } from '../animations/index';
import swal from 'sweetalert2';
declare var $:any; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class LoginComponent implements OnInit {
  clients:Client[]; 
  animateLogin:string = "";
  animateRegister:string = "";

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private loginservice:ApiConnectService) { }

  ngOnInit() {
    
    makeRegistrationJS();
    
    this.loginservice.getClientLoginInfo().subscribe((clients) =>{
      // This will show all the data returned by the service call to the login service
      this.clients = clients;
    });
    
    // Makes the pop-up box for the registration using jquery
    function makeRegistrationJS() {
      // This is to test swall integration
      $(document).on('click', '#registerButton', function(){
        swal.setDefaults({
          input: 'text',
          confirmButtonText: 'Next &rarr;',
          showCancelButton: true,
          progressSteps: ['1', '2', '3','4','5']
        })
        
        var steps = [
          {
            title: 'Enter an Invoice Number',
            text: 'Enter the invoice number from one of you open invoices',
            html: 
              '<!-- The rotating arrow -->'+
              '<div class="arrowCap"></div>'+
              '<div class="arrow"></div>'+
              '<p class="meterText">Password Meter</p>'
          },
          {
            title: 'Enter an Email Address',
            text: 'Enter an email address to register with'
          },
          'Confirm your Email Address',
          {
            title: 'Enter Password',
            text: 'Password must be at least 8 characters long and contain an upper case, lower case, and number'
          },
          'Confirm your Password'
        ]
        
        swal.queue(steps).then(function (result) {
          swal.resetDefaults()
          swal({
            title: 'All done!',
            html:
              'Your answers: <pre>' +
                JSON.stringify(result) +
              '</pre>',
            confirmButtonText: 'Registration Complete'
          })
        }, function () {
          swal.resetDefaults()
        });
      });
    }

  }

  ngOnDestroy() {
    
  }
  
  // This function is responsible for checking the email and password to a valid login in the database
  processLogin(emailString){
    this.validateInput(emailString);
  }

  // These functions will add the animation to the front page
  animateLoginButton($event){
      this.animateLogin = $event.type == 'mouseover' ? 'pulse' : '';
  }
  animateRegisterButton($event){
    this.animateRegister = $event.type == 'mouseover' ? 'pulse' : '';
  }
  // This checks that the correct input is entered 
  private validateInput(input_string){
    // String used to test the validity of an email
    var re_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    // Check each field has a value.
    if( input_string == '')
    {
      swal(
        'Email not entered',
        'You must enter an email in the email box. Please try again',
        'error'
      );
    }
    else if(!re_email.test(input_string))
    {
      swal(
        'Valid Email Missing',
        'You must provide a valid email address. Please try again',
        'error'
      );
    }
    else
    {
        // If there is a valid email present then check the Email in the system
        this.checkEmail(input_string);
    }
  }

  // This checks if the email is present in our Client database
  // This has to use a for loop so look up a more effecient search method than basic for
  private checkEmail(input_email){
    
    for(var i = 0; i < this.clients.length; i++)
    {
        if(this.clients[i]['ClientEmail'] == input_email)
        {
          // This will load email as a global variable
          this.loginservice.setEmailString(input_email);
          
          // redirect to invoice view
          this.router.navigate(['invoice']);
        }
    }

  }

}
interface Client{
  id: number,
  ClientNumber: string,
  ClientName: string,
  ClientEmail: string,
  TotalInvoiceCount: number,
  UnpaidCount: number,
  TotalHoursCharged: number,
  TotalAmountPaid: number,
  TotalAmountUnPaid: number
};