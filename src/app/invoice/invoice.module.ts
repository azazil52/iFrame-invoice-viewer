import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { InvoiceComponent } from './invoice.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [InvoiceComponent]
})
export class InvoiceModule { }
