import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: ['']
})
export class SignupComponent implements OnInit {

  private user:User
  private successmessage:string;
  private errormessage:string

  constructor(
    private authService:AuthenticationService
  ) { }

  ngOnInit() {
    this.user = new User('','');
  }

  registerUser(){
    this.authService.registerUser(this.user).subscribe(
      () => {
        this.successmessage = 'Your account has been created successfully! Please use login page to login to your account';
      },
      error => {
        this.errormessage = error.message;
      }
    )
    //this.user.username
  }

}
