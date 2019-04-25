import { Injectable } from '@angular/core';

import { Repository } from '../shared/repository.type';
import { Score } from '../shared/score.type';
import { Measurement } from '../shared/measurement.type';
import { Benchmark } from '../shared/benchmark.type';
import { ComponentMeasurement } from '../shared/component-measurement.type';
import { ApiGetService } from '../shared/core/apiget.service';
import { MessageService } from '../shared/message/message.service';


@Injectable()
export class ProjectService {

  constructor(private apiGetService: ApiGetService,
              private messageService: MessageService) { }

  getSupportedLanguages(): Promise<void | string[]> {
    return this.apiGetService.get<string[]>('supported-languages');
  }

  getProject(projectGuid: string): Promise<void | Repository> {
    return this.apiGetService.get<Repository>(`repositories/${projectGuid}/`)
    .catch((e) => {
      this.handleError(e, `Unable to retrieve project from server for project ${projectGuid}.`);
    });
  }

  getProjects(): Promise<void | Repository[]> {
    return this.apiGetService.get<Repository[]>('repositories/')
    .catch((e) => {
      this.handleError(e, `Unable to retrieve project list from server.`);
    });
  }

  getBenchmarks(projectGuid: string): Promise<void | Benchmark[]> {
    return this.apiGetService.get<Benchmark[]>(`repositories/${projectGuid}/benchmarks/`)
    .catch((e) => {
      this.handleError(e, `Unable to retrieve benchmarks from server for project ${projectGuid}.`);
    });
  }

  getMeasurements(projectGuid: string): Promise<void | Measurement[]> {
    return this.apiGetService.get<Measurement[]>(`repositories/${projectGuid}/measurements/`)
    .catch((e) => {
      this.handleError(e, `Unable to retrieve measurements from server for project ${projectGuid}.`);
    });
  }

  createMeasurement(projectGuid: string): Promise<void | Measurement> {
    return this.apiGetService.post<Measurement>(`repositories/${projectGuid}/measurements/`, {})
    .catch((e) => {
      this.handleError(e, 'The server was not accepting a request to create a new measurement.');
    });
  }

  getScores(projectGuid: string, measurementGuid: string) {
    return this.apiGetService.get<Score[]>(`repositories/${projectGuid}/measurements/${measurementGuid}/scores/`)
    .catch((e) => {
      this.handleError(e, `Unable to retrieve scores from server for project ${projectGuid}.`);
    });
  }

  getComponentMeasurements(projectGuid: string, measurementGuid: string) {
    return this.apiGetService.get<ComponentMeasurement[]>(`repositories/${projectGuid}/measurements/${measurementGuid}/components/`)
    .catch((e) => {
      this.handleError(e, `Unable to retrieve component measurements from server for project ${projectGuid}.`);
    });
  }

  createProject(formData: any): Promise<void | Repository> {
    return this.apiGetService.post<Repository>('repositories/', formData)
    .catch((e) => {
      this.handleError(e, 'Please check the URL and credentials.');
    });
  }

  updateProject(formData: any, projectUUID: string): Promise<void | Repository> {
    return this.apiGetService.put<Repository>(`repositories/${projectUUID}/`, formData)
    .catch((e) => {
      this.handleError(e, 'Please check the URL and credentials.');
    });
  }

  deleteProject(projectUUID: string): Promise<void | boolean> {
    return this.apiGetService.delete<boolean>(`repositories/${projectUUID}`)
    .catch((e) => {
      this.handleError(e, 'The project was unable to be deleted.');
    });
  }

  handleError(e, errorMessage) {
    let errorText;

    if (e.headers.get('content-type') === 'application/json') {
      errorText = e.text();
    }

    this.messageService.add(`There was a problem: ${e.status} ${e.statusText}`,
                            errorText || errorMessage);
  }
}
