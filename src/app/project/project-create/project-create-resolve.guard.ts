import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { ProjectService } from '../project.service';

@Injectable()
export class ProjectCreateResolveGuard implements Resolve<void | string[]> {

  constructor(private projectService: ProjectService) {}

  resolve(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<void | string[]> {

    return this.projectService.getSupportedLanguages();
  }
}
