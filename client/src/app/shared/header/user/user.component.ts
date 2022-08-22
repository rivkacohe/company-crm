import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  showLogOut:boolean=false;
  userEmail:string|null|undefined= this.authService.userEmail;
  constructor( private authService:AuthService,  private router: Router) { }

  ngOnInit(): void {
  }
  toggleLogOut(){
    if (this.showLogOut){
      this.showLogOut=false;
      return
    }
    this.showLogOut=true;
    return
  }


    logout() {
      this.authService.logout();
      this.router.navigate(['login-component']);
  }

}
