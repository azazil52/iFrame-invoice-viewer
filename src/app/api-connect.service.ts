import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiConnectService {
  // The shared variable that will transport our email to different pages
  clientEmail:string = "test@email.com";
  invoiceAmount:number = 0.00;

  constructor(public http:Http) { 
    console.log('Data Retreaval Service connected...');
  }

  setEmailString(data:string){
    this.clientEmail = data;
  }

  getEmailString(){
    return this.clientEmail;
  }

  setInvoiceAmount(amount:number){
    this.invoiceAmount = amount;
  }
  
  getInvoiceAmount(){
    return this.invoiceAmount;
  }

  getClientLoginInfo(){
    // Testing for client retreaval
    // This link works for the invoice service not the login service 
  	return this.http.get(' https://parservice.azurewebsites.net/api/Clients/0')
      .map(res => res.json());
  }

  getClientInvoiceInfo(){
    // Testing for client retreaval
    // This link works for the invoice service not the login service 
    // return this.http.get(' https://parservice.azurewebsites.net/api/Invoice/0/acastanal%40bridges-and-roads.com')
    return this.http.get(' https://parservice.azurewebsites.net/api/Invoice/0/' + this.sanitizeEmailString(this.clientEmail))
      .map(res => res.json());
  }

  getClientProfileInfo(){
    // Testing for client retreaval
    // This link works for the invoice service not the login service 
  	return this.http.get(' https://parservice.azurewebsites.net/api/ClientProfile/0/acastanal%40bridges-and-roads.com')
      .map(res => res.json());
  }

  // This removes the '@' and replaces it with '%40'
  private sanitizeEmailString(emailStr){
      return emailStr.replace("@","%40");
  }

}
