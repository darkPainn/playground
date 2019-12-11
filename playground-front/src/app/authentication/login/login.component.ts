import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../model/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ['']
})
export class LoginComponent implements OnInit {

  private user:User;
  private errorMessage:string;

  constructor(
    private authService:AuthenticationService,
    private router:Router) { 
      
    }

  ngOnInit() {
    //create an empty user
    this.user = new User('','');
  }

  logUserIn(){
    this.authService.authenticateUser(this.user).subscribe(
      response => {
        sessionStorage.setItem('authenticatedUser', response.name);
        sessionStorage.setItem('authenticatedUserCredentials', response.credentials);
        this.router.navigate(['/home']);
      },
      error => {
        this.errorMessage = 'Invalid credentatials!' + error.message;
      }
    );
  }

}
