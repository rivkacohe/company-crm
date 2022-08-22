import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer, CustomerToAdd, Login, RegisterUser, User } from '../shared/types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private token = '';

  setToken(value: string) {
      this.token = value;
  }
  constructor(private http: HttpClient) { }



  getCustomersList(): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(`${environment.serverUrl}/customers`,
    { headers: { 'x-auth-token': this.token }})
  }

  addCustomer(customer: CustomerToAdd): Observable<Customer> {
    return this.http.post<Customer>(
      `${environment.serverUrl}/customers`,
      customer,
      { headers: { 'Content-Type': 'application/json', 'x-auth-token': this.token  } }
    )
  }

  deleteCustomer(customerId : number){
return this.http.delete(
  `${environment.serverUrl}/customers?id=${customerId}`,
  { headers: { 'x-auth-token': this.token }}
)
  }

  editCustomer(customer:Customer){
    return this.http.patch(
      `${environment.serverUrl}/customers`,
      customer,
      { headers: { 'Content-Type': 'application/json', 'x-auth-token': this.token } }
    )
    
  }

  login(details: Login): Observable<User> {
    return this.http.post<User>(
      `${environment.serverUrl}/login`,
      details,
      { headers: { 'Content-Type': 'application/json', 'x-auth-token': this.token } }
    )
}

register(user: RegisterUser): Observable<User> {
    return this.http.post<User>(
      `${environment.serverUrl}/register`,
      user,
      { headers: { 'Content-Type': 'application/json' , 'x-auth-token': this.token
    } }
    )
}


}