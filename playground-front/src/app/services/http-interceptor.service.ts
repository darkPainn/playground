import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{  

  constructor(private authService:AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if(this.authService.isUserLoggedIn()){
      let basicAuthHeader = 
        'Basic ' + window.btoa(sessionStorage.getItem('authenticatedUser') 
        + ':' + sessionStorage.getItem('authenticatedUserCredentials'));
      req = req.clone({
        setHeaders:{Authorization:basicAuthHeader}
      });
    }
    return next.handle(req);
  }


}
