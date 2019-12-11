import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl:string = 'http://localhost:8080/authentication/';

  constructor(
    private http:HttpClient
  ) { }

  authenticateUser(user:User){
    return this.http.post<any>(this.baseUrl + 'login',user);
  }

  isUserLoggedIn():boolean{
    let user = sessionStorage.getItem('authenticatedUser');
    return !(user === null);
  }

  registerUser(user:User){
    return this.http.post<any>(this.baseUrl + 'register',user);
  }
}
