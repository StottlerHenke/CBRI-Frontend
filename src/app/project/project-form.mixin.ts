import { OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from '../shared/user.type';
import { UserService } from '../shared/core/user.service';

import { ProjectService } from './project.service';

export class ProjectFormMixin implements OnInit {
  authRequired = new FormControl(false);
  form: FormGroup;
  user: User;
  supportedLanguages: string[] = [];

  constructor(
    protected route: ActivatedRoute,
    protected fb: FormBuilder,
    protected userService: UserService,
    protected projectService: ProjectService) {}

  ngOnInit() {
    this.supportedLanguages = this.route.snapshot.data.supportedLanguages;

    this.userService.getUser().then((user: User) => {
      this.user = user;
      this.initializeForm();
    });
  }

  initializeForm() {
    const authUsername = this.fb.control({value: '', disabled: true});
    const authPassword = this.fb.control({value: '', disabled: true});

    this.form = this.fb.group({
      name: ['', Validators.required],
      // jrl made address optional
      address: '',
      token: '',
      allowed_emails: [[this.user.email]],
      description: ['', Validators.required],
      topics: '',
      auth_required: this.authRequired,
      auth_username: authUsername,
      auth_password: authPassword,
      //TODO: Organization. -djc 2018-05-30
      //organization: "",
      language: [this.supportedLanguages[0], Validators.required],
    });

    this.authRequired.valueChanges.subscribe((isAuthRequired: boolean) => {
      if (isAuthRequired) {
        authUsername.enable();
        authPassword.enable();
      }
      else {
        authUsername.disable();
        authPassword.disable();
      }
    });
  }
}
