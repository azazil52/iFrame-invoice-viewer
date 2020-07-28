import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule} from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule, routedComponents } from './app-routing.module';
import { ApiConnectService } from './api-connect.service';
import { LoginComponent } from './login/login.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CardValidationComponent } from './card-validation/card-validation.component';
import { MonthlyValidationComponent } from './monthly-validation/monthly-validation.component';
import { CardSuccessComponent } from './card-success/card-success.component';

@NgModule({
  declarations: [
    AppComponent,
    routedComponents
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [ApiConnectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
