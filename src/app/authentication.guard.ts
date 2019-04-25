import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { LocalStorageService } from 'angular-2-local-storage';

import { UserService } from './shared/core/user.service';
import { ConfigService } from './shared/core/config.service';


@Injectable()
export class AuthenticationGuard implements CanActivate, CanActivateChild {

  constructor (private userService: UserService,
               private configService: ConfigService,
               private localStorageService: LocalStorageService,
               private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
    return this.isAuthenticated(next, state.url);
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
    return this.isAuthenticated(next, state.url);
  }

  isAuthenticated(route, url): Promise<boolean> {
    const token = this.localStorageService.get('token');
    if (token) {
      return Promise.resolve(true);
    }
    else {
      this.router.navigateByUrl('/user/login');
    }
  }
}
