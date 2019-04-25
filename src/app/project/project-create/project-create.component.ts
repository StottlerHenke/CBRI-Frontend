import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../shared/core/user.service';
import { MessageService } from '../../shared/message/message.service';
import { Repository } from '../../shared/repository.type';
import { ProjectService } from '../project.service';
import { ProjectFormMixin } from '../project-form.mixin';


@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent extends ProjectFormMixin implements OnInit {

  constructor(private router: Router,
              private messageService: MessageService,
              protected route: ActivatedRoute,
              protected fb: FormBuilder,
              protected userService: UserService,
              protected projectService: ProjectService) {
                super(route, fb, userService, projectService);
              }

  ngOnInit() {
    super.ngOnInit();
  }

  submitForm(ev) {
    const formData = this.form.value;

    this.projectService.createProject(formData);
    this.messageService.add(
      'Analyzing project',
      'An email will be sent to you when analysis is complete.');
    this.router.navigate(['/project', 'list']);
  }

  addAllowedEmail(sharedWithEl: HTMLInputElement) {
    this.form.controls.allowed_emails.value.unshift(sharedWithEl.value);
    sharedWithEl.value = '';
  }

  removeAllowedEmail(removeEmail: string) {
    const control = this.form.controls.allowed_emails;
    control.setValue(control.value.filter((email: string) => email !== removeEmail));
  }
}
