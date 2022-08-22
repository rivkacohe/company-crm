import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})



export class HeaderComponent implements OnInit {
 
  
 userEmail:string|null|undefined

  constructor( private authService: AuthService
   ) 
    {
            }

  setUserEmail(){
    this.userEmail = this.authService.userEmail;
  }
  isLoggedIn(){
   return  this.authService.isLoggedIn(); 
  }

  ngOnInit(): void {
  }

  ngOnChanges(){
    this.isLoggedIn();

  }


}
