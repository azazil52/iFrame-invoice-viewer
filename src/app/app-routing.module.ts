import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CardValidationComponent } from './card-validation/card-validation.component';
import { MonthlyValidationComponent } from './monthly-validation/monthly-validation.component';
import { CardSuccessComponent } from './card-success/card-success.component';


const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent, data: {state: 'login'} },
	{ path: 'invoice', component: InvoiceComponent, data: {state: 'invoice'} },
	{ path: 'checkout', component: CheckoutComponent, data: {state: 'checkout'} },
	{ path: 'card-validation', component: CardValidationComponent, data: {state: 'card-validation'} },
	{ path: 'monthly-validation', component: MonthlyValidationComponent, data: {state: 'monthly-validation'} },
	{ path: 'card-success', component: CardSuccessComponent, data: {state: 'card-success'} }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [LoginComponent,InvoiceComponent,CheckoutComponent,CardValidationComponent,MonthlyValidationComponent,CardSuccessComponent];
