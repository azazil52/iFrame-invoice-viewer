import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { fadeInAnimation } from '../animations/index';
import { ApiConnectService } from './../api-connect.service';
import swal from 'sweetalert2';
import * as $ from 'jquery';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''}
})
export class CheckoutComponent implements OnInit {
  animate:string = "";
  invoice_total:number = 0.0;
  invoice_adjusted_total:number = 0.0;
  admin_fee:number = 50.00;
  interest_amount:number = 0.0;
  first_monthly_installment: number = 0.0;
  remaining_monthly_installment:number = 0.0;
  @Input() animateEvent = true;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private invoiceservice:ApiConnectService) { }

  ngOnInit() {
      // This will set the invoice total to the one selected on the previous page
      this.invoice_total = this.invoiceservice.getInvoiceAmount();
      
      this.mobileStyleChange();
      this.quickFeeQualification();
      this.monthlyCostCalculation();
      $(".plan").hover(this.adminHover);
  }

  quickfeePopBox() {
    swal.setDefaults({
      input: 'text',
      width: 850,
      padding: 50,
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2', '3','4','5']
    })
    
    var steps = [
      {
        title: 'Enter an Invoice Number',
        text: 'Enter the invoice number from one of you open invoices',
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
        confirmButtonText: 'Registration Complete',
      })
    }, function () {
      swal.resetDefaults()
    });
  }

  creditCardPopBox() {
    swal({
      title: 'Multiple inputs',
      width: 850,
      padding: 50,
      html:
        '<input type="text" class="swal2-input" id="invoiceNumber" name="invoiceNumber" placeholder="Invoice Number*" tabindex="1">' +			  
        '<input type="text" name="amount" id="amount" class="swal2-input" placeholder="Invoice Amount" aria-describedby="basic-addon1" tabindex="2">' +
        '<input type="text" class="swal2-input" name="firstname" placeholder="First Name*" tabindex="3">' +
        '<input type="text" class="swal2-input" name="lastname" placeholder="Last Name*" tabindex="4">' +
        '<input type="text" class="swal2-input" id="phone" name="phone" placeholder="Phone Number*" tabindex="5">' +
        '<input type="email" class="swal2-input" name="email" placeholder="Email Address*" tabindex="6">' +
        '<input id="swal-input1" class="swal2-input">' +
        '<input id="swal-input2" class="swal2-input">',
      focusConfirm: false,
      preConfirm: function () {
        return new Promise(function (resolve) {
          resolve([
            $('#swal-input1').val(),
            $('#swal-input2').val()
          ])
        })
      }
    }).then(function (result) {
      swal(JSON.stringify(result))
      // this.router.navigate(['/card-validation']);
    }).catch(swal.noop);
  }

  achPopBox() {
    this.router.navigate(['/card-validation']);
  }

  animateObject($event){
    this.animate = $event.type == 'mouseover' ? 'bounce' : 'bounceIn';
  }

  private mobileStyleChange() {      
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
  
  }
    
  private adminHover() {
    var plan = $('.plan');
  
    plan.siblings().attr('id', '');
    
    $(this).attr('id', 'most-popular');
  }

  // If the invoice amount is above 2000 dollars then the quickfee option is revealed
  private quickFeeQualification(){

    if(this.invoice_total < 2000)
    {
        $('#most-popular').hide();
    }

  }

  // This does all the math for the monthly cost Calculation
  private monthlyCostCalculation(){
      this.interest_amount = (this.invoice_total * .075);
      this.invoice_adjusted_total = (this.invoice_total + this.interest_amount);
      this.first_monthly_installment = (this.invoice_adjusted_total / 12) + 100;
      this.remaining_monthly_installment = (this.invoice_adjusted_total / 12);
  }

}
