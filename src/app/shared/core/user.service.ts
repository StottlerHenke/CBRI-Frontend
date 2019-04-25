import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';

import { LocalStorageService } from 'angular-2-local-storage';

import { ApiGetService } from './apiget.service';
import { WindowRefService } from './window-ref.service';

import { User } from '../user.type';


@Injectable()
export class UserService {
    private userSubject: Subject<User> = new Subject<User>();
    user$ = this.userSubject.asObservable();
    user: User;

    constructor(private apiGetService: ApiGetService,
                private localStorageService: LocalStorageService,
                private router: Router,
                private windowRef: WindowRefService) { }

    login(username: string = '', password: string = ''): Promise<void | User> {
      const postData = { username: username, password: password };

      return this.apiGetService.post<string>('login/', postData).then(
        (response: any) => {
          const token = response.token;
          this.apiGetService.token = token;
          this.localStorageService.set('token', token);

          return this.getUser();
        });
    }

    getUser() {
      return this.apiGetService.get<User>('current-user/').then((user: User) => {
        this.user = user;
        this.userSubject.next(user);
        return user;
      }).catch((e) => {
        if (e.status === 401) {
          this.logout();
        }
      });
    }

    logout() {
      this.localStorageService.clearAll();
      this.apiGetService.token = null;
      this.user = undefined;
      this.userSubject.next(this.user);
      this.router.navigateByUrl('/user/login');
    }

    updateUser(user: User): Promise<User> {
        const userGuid = this.localStorageService.get('userGuid');

        return this.apiGetService.put<User>(`users/${userGuid}/`, user, { usePut: true })
          .then((updatedUser: User) => {
            this.userSubject.next(updatedUser);
            this.user = updatedUser;
            return updatedUser;
          });
    }
}
