import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { User } from '../../shared/user.type';
import { UserService } from '../../shared/core/user.service';
import { MessageService } from '../../shared/message/message.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: boolean;

  constructor(private userService: UserService,
              private messageService: MessageService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submitForm(ev) {
    const username = this.loginForm.controls.username.value;
    const password = this.loginForm.controls.password.value;

    this.userService.login(username, password).then((user: User) => {
      if (user) {
        this.router.navigateByUrl('/project/list');
      }
      else {
        this.messageService.add('Login Failed',
                                'Please verify username and password.',
                                'login');
      }
    }).catch((e) => {
        this.messageService.add('Login Failed',
                                'Please verify username and password.',
                                'login');
    });
    return false;
  }
}
