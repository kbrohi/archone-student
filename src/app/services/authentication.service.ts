import { Injectable } from '@angular/core';
import { registeredUsers } from '../../config/config.json';
import { Router , ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private router: Router) { }
  login(username, password) {
    let check = true;
    registeredUsers.map(registeredUser => {
      if (registeredUser.login === username && registeredUser.password === password) {
        check = false;
        localStorage.setItem('currentUser', JSON.stringify(registeredUser));
        this.router.navigateByUrl('')
      }
    })
    if (check) {
      window.alert("Username or Password is incorrect.")
    }


  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentUser')) {
    // logged in so return true
    return true;
    }
    
    // not logged in so redirect to login page with the return url
    this.router.navigateByUrl('login');
    return false;
    }
}
