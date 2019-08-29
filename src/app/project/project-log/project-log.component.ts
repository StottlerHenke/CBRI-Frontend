import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Repository } from '../../shared/repository.type';

import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-log',
  templateUrl: './project-log.component.html',
  styleUrls: ['./project-log.component.css']
})
export class ProjectLogComponent implements OnInit {
  project: Repository;
  log_html: string;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const repositoryId: string = paramMap.get('guid');
      this.projectService.getProject(repositoryId).then(
        (project: Repository) => {
          this.project = project;
          this.log_html = project.log.replace(/\n/g, '<br />');
        });
    });
  }

}
