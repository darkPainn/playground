import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate{

    constructor(
        public router:Router){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if(sessionStorage.getItem('authenticatedUser') != null){
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }

}