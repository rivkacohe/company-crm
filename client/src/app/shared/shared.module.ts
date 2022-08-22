import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from '../app-routing.module';
import { UserComponent } from './header/user/user.component';



@NgModule({
  declarations: [
    HeaderComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports:[
    HeaderComponent,
  ]
})
export class SharedModule { }
