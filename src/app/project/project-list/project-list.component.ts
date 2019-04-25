import { Component, OnInit } from '@angular/core';

import { Repository } from '../../shared/repository.type';
import { Measurement } from '../../shared/measurement.type';
import { Score } from '../../shared/score.type';

import { ProjectMixin } from '../project.mixin';
import { ProjectService } from '../project.service';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent extends ProjectMixin implements OnInit {
  projects: Repository[];
  projectsLatestMeasurement: { [projectGuid: string]: Measurement } = {};
  projectsBaselineMeasurement: { [projectGuid: string]: Measurement } = {};

  constructor(protected projectService: ProjectService) { super(projectService); }

  ngOnInit() {
    this.projectService.getProjects().then((projects: Repository[]) => {
      this.projects = projects = projects || [];
      projects.forEach((project: Repository) => {
        const projectGuid = this.parseGuid(project.url);
        this.fetchProjectMeasurements(projectGuid);
      });
    });
  }

  onLatestMeasurement(projectGuid: string, measurement: Measurement) {
    /* Store projects latest measurement */
    this.projectsLatestMeasurement[projectGuid] = measurement;
    super.onLatestMeasurement(projectGuid, measurement);
  }

  onBaselineMeasurement(projectGuid: string, measurement: Measurement) {
    /* Store projects baseline measurement */
    this.projectsBaselineMeasurement[projectGuid] = measurement;
    super.onBaselineMeasurement(projectGuid, measurement);
  }
}
