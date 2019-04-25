import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, ParamMap } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../shared/core/user.service';
import { MessageService } from '../../shared/message/message.service';
import { Repository } from '../../shared/repository.type';
import { ProjectService } from '../project.service';
import { ProjectFormMixin } from '../project-form.mixin';


@Component({
  selector: 'app-project-update',
  templateUrl: './project-update.component.html',
  styleUrls: ['./project-update.component.css']
})
export class ProjectUpdateComponent extends ProjectFormMixin implements OnInit {
  project: Repository;

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

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const projectGuid = paramMap.get('guid');

      this.projectService.getProject(projectGuid).then((project: Repository) => {
        this.project = <Repository>project;
        this.instantiateForm(project);
      });
    });
  }

  instantiateForm(project: Repository) {
    this.form.patchValue({
      name: project.name,
      address: project.address,
      token: project.token,
      allowed_emails: project.allowed_emails,
      description: project.description,
      topics: project.topics,
      organization: project.organization,
      language: project.language,
    });
  }

  submitForm(ev) {
    const formData = Object.assign({}, this.form.value);

    this.projectService.updateProject(formData, this.project.id);
    this.messageService.add('Project updated', '');
    this.router.navigate(['/project', this.project.id]);
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
