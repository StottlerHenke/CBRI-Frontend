import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../user.service';


@Component({
  selector: 'app-user-update-password',
  templateUrl: './user-update-password.component.html',
  styleUrls: ['./user-update-password.component.css']
})
export class UserUpdatePasswordComponent implements OnInit {
  updatePasswordForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.updatePasswordForm = this.fb.group({
      old_password: ['', Validators.required],
      new_password: ['', Validators.required],
    });
  }

  submitForm(ev) {
    const formData = this.updatePasswordForm.value;

    this.userService.updatePassword(formData).then(() => {
      this.router.navigate(['/project', 'list']);
    });
  }
}
