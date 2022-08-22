import { Component,NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/api.service';
import { Customer } from 'src/app/shared/types';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  customers!: Array<Customer>;
  numbers!: Array<number>;
  currentCustomer!: Customer;
  public customerForm: FormGroup;
  showNotification = false;


  deleteCustomer(newItem: Customer) {
    this.currentCustomer = newItem;
    this.apiService.deleteCustomer(newItem.id).subscribe({
      next: ()=> this.getCustomers(),
      complete: () => console.log(newItem.id),
      error: (err) => console.error(err),
    })
  }

  editcustomer(newItem: Customer) {
    this.currentCustomer = newItem;
    this.apiService.editCustomer(newItem).subscribe({
      next: ()=> this.getCustomers(),
      complete: () => console.log(newItem),
      error: (err) => console.error(err),
    })
  }

  constructor(private apiService: ApiService, public formBuilder: FormBuilder) {
    this.customerForm = this.formBuilder.group({
      first_name: new FormControl('', {
        validators: Validators.required
      }),
      last_name: new FormControl('', {
        validators: Validators.required
      }),
      phone: new FormControl('', {
        validators: Validators.required
      }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
    });
  }

  onSubmit() {

    if (!this.customerForm.valid) {
      return;
    }

    this.apiService.addCustomer(this.customerForm.value).subscribe({
      next: (data: Customer) => {
        this.getCustomers();
        this.currentCustomer = data;
        this.showNotification = true;
        this.customerForm.reset();
      },
      error: (err) => console.error(err)
    })
  }

  toggleMymodal(){
    this.showNotification = false;
  }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.apiService.getCustomersList().subscribe({
      next: (data: Array<Customer>) => { this.customers = data },
      complete: () => console.log(this.customers),
      error: (err) => console.error(err),
    })
  }

}
