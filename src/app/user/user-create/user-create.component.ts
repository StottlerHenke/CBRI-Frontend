import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../../shared/user.type';
import { UserService as AuthService } from '../../shared/core/user.service';

import { UserService } from '../user.service';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  createUserForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService,
              private authService: AuthService) { }

  ngOnInit() {
    this.createUserForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      organization: [null],
    });
  }

  submitForm(ev) {
    const formData = this.createUserForm.value;

    this.userService.createUser(formData).then((user: User) => {
      const username = this.createUserForm.controls.username.value;
      const password = this.createUserForm.controls.password.value;

      this.authService.login(username, password).then((user: User) => {
        this.router.navigate(['/project', 'list']);
      });
    });
  }
}
