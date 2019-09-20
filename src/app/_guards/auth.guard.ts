import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DataService } from '../_services/data.service';
import { first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (
    private router: Router,
    private data: DataService
  ) { }

  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.data.user.pipe(first(), map(
      user => {
        if (user) {
          // check if route is restricted by role
          console.log(route.data.roles, user.Roles)
          if (route.data.roles && user.Roles.some(role => route.data.roles.indexOf(role.Role.Name) !== -1)) {
            return true;
          }
          // role not authorised so redirect to home page
          this.router.navigateByUrl('/dashboard');
          return false;
        } else {
          // not logged in so redirect to login page with the return url
          this.router.navigateByUrl('/login', { queryParams: { returnUrl: state.url } });
          return false;
        }
      })
    );
  }
}
