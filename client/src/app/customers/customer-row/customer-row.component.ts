import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/shared/types';

@Component({
  selector: 'app-customer-row',
  templateUrl: './customer-row.component.html',
  styleUrls: ['./customer-row.component.scss']
})

export class CustomerRowComponent implements OnInit {
  @Input() customer: Customer = {
    id: 0,
    first_name: '',
    last_name: '',
    phone: '',
    email: ''
  };
  public customerForm: FormGroup;

  @Input() rowNum: number = 0;
  @Output() addCustomerEvent = new EventEmitter<Customer>();
  @Output() deleteCustomerEvent = new EventEmitter<Customer>();


  editState: boolean = false;
  alertState: string= 'delete'


  handleDelete(value: Customer,value2:boolean) {
    if (value2 ){
      value = this.customerForm.getRawValue();
      this.deleteCustomerEvent.emit(value);
    }
else return;

  }

  handleEdit(value: Customer, value2:boolean) {
    if (!this.editState) {
      this.customerForm.enable();
      this.editState =true;
      this.alertState='edit';
      return;
    }

    if (value2 ){
    value = this.customerForm.getRawValue();
    this.addCustomerEvent.emit(value);
    }

    this.alertState='delete';
    this.editState = false;
    this.customerForm.disable();

  }

  constructor(public formBuilder: FormBuilder) {

    this.customerForm = this.formBuilder.group({
      id: new FormControl(this.customer.id, {
        validators: Validators.required
      }),
      first_name: new FormControl(this.customer.first_name, {
        validators: Validators.required
      }),
      last_name: new FormControl(this.customer.last_name, {
        validators: Validators.required
      }),
      phone: new FormControl(this.customer.phone, {
        validators: Validators.required
      }),
      email: new FormControl(this.customer.email, {
        validators: [Validators.required, Validators.email]
      }),
    });
  }


  ngOnInit(): void {
    this.customerForm.setValue({
      id: `${this.customer.id}`,
      first_name: `${this.customer.first_name}`,
      last_name: `${this.customer.last_name}`,
      phone: `${this.customer.phone}`,
      email: `${this.customer.email}`,
    })

    this.customerForm.disable();


  }


}
