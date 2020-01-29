import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService,private router: Router,private data: ActivatedRoute,private loginService:LoginService){}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      this.authService.getCurrentUser()
      .then(user => {
        return resolve(true);
      }, err => {
        this.router.navigate(['login'],{ queryParams: { returnUrl: state.url }});
        return resolve(false);
      });
    });
  }
  
}
