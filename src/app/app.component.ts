import { Component, OnInit } from '@angular/core';

import { UserService } from './shared/core/user.service';
import { User } from './shared/user.type';

import { AppService } from './app.service';
import { slidePanel } from './app.animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ slidePanel ],
})
export class AppComponent implements OnInit {
  user: User;
  initials: string;
  menuOpen = false;
  userMenuState = 'inactive';
  versionInfo$: Promise<string>;

  constructor(
    private appService: AppService,
    private userService: UserService) {}

  toggleMenu() {
    this.userMenuState =
      this.userMenuState === 'inactive' ? 'active' : 'inactive';
  }

  makeInitials(user) {
    // Safety for null user or missing names
    let firstName = '-';
    let lastName = '-';

    if (user) {
      if (user.first_name) {
        firstName = user.first_name;
      }

       if (user.last_name) {
         lastName = user.last_name;
      }
    }

    const initials = firstName[0] + lastName[0];

    return initials.toUpperCase();
  }

  ngOnInit() {
    this.userService.getUser().then((user: User) => {
      this.updateUser(user);
    });

    this.userService.user$.subscribe((user: User) => {
      this.updateUser(user);
    });

    this.versionInfo$ = this.appService.getVersionInfo();
  }

  updateUser(user: User) {
    this.user = user;
    this.initials = this.makeInitials(user);
  }

  signOut() {
    this.userService.logout();
  }

  getYear() {
    return new Date().getFullYear();
  }
}
