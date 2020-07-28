import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { fadeInAnimation } from '../animations/index';
import { ApiConnectService } from './../api-connect.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''}
})
export class InvoiceComponent implements OnInit {
  profiles:Invoice[];
  paidInvoices:Invoice[];
  unPaidInvoices:Invoice[];
  clientInfo:Client[];

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private invoiceservice:ApiConnectService) { }

  ngOnInit() {
    this.invoiceservice.getClientInvoiceInfo().subscribe((profiles) =>{

      correctEntryFormat(profiles);
      
      this.paidInvoices = organizePaidInvoice(profiles);

      this.unPaidInvoices = organizeUnPaidInvoice(profiles);

      this.profiles = profiles;
    });

    // Maintinence Code for the look of the invoice
    function correctEntryFormat(invoices){
      
      for(var i = 0; i < invoices.length; i++)
      {
        var text = invoices[i]['InvoiceDate'];
        var position = text.indexOf('T');
    
        text = text.substring(0,position);
    
        invoices[i]['InvoiceDate'] = text;
      }
      
    }
    // This sorts the paid invoices
    function organizePaidInvoice(invoices){
      
      var newArray = [];

      for(var i = 0; i < invoices.length; i++)
      {
          if(invoices[i]['InvoiceBalance'] == 0)
          {
            newArray.push(invoices[i]);
          }
      }
      
      return newArray;
    }
    // This sorts the unpaid invoices
    function organizeUnPaidInvoice(invoices){
      
      var newArray = [];

      for(var i = 0; i < invoices.length; i++)
      {
          if(invoices[i]['InvoiceBalance'] != 0)
          {
            newArray.push(invoices[i]);
          }
      }
      
      return newArray;
    }
  }

  setInvoiceAmount(invoiceAmt){
    this.invoiceservice.setInvoiceAmount(invoiceAmt);
    this.router.navigate(['/checkout']);
  }

  // This will display the Client Email on the Invoice Screen
  getClientEmail(){
      return this.invoiceservice.getEmailString();
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
interface Invoice {
  InvoiceNum: number,
  InvoiceAmount: number,
  InvoiceAdjust: number,
  InvoiceHours: number,
  InvoiceDate: Date,
  InvoiceBalance: number,
  InvoicePaidFlag: boolean
};
