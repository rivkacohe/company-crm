import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers/customers.component';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerRowComponent } from './customer-row/customer-row.component';


@NgModule({
  declarations: [
    CustomersComponent,
    CustomerRowComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CustomersModule { }
