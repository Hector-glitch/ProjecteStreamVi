import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('isLogged') === 'true') {
      return true;
    } else {
      // Si no està autenticat, redirigeix al login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
