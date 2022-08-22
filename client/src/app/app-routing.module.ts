import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CustomersComponent } from './customers/customers/customers.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'home-component', component:HomeComponent},
  {path:'customers-component', component:CustomersComponent},
  {path:'signup-component', component:SignupComponent},
  {path:'login-component', component:LoginComponent}
,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
