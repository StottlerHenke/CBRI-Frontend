import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationGuard } from '../authentication.guard';

import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectCreateResolveGuard } from './project-create/project-create-resolve.guard';
import { ProjectUpdateComponent } from './project-update/project-update.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectLogComponent } from './project-log/project-log.component';
import { BenchmarkDescriptionComponent } from './benchmark-description/benchmark-description.component';
import { MeasurementsTableComponent } from './measurements-table/measurements-table.component';

const routes: Routes = [
  {
    path: 'project/list',
    component: ProjectListComponent,
    canActivate: [AuthenticationGuard],
    data: { title: 'Dashboard' }
  },
  {
    path: 'project/create',
    component: ProjectCreateComponent,
    canActivate: [AuthenticationGuard],
    resolve: { supportedLanguages: ProjectCreateResolveGuard },
    data: { title: 'Add Project' },
  },
  {
    path: 'project/:guid/update',
    component: ProjectUpdateComponent,
    canActivate: [AuthenticationGuard],
    resolve: { supportedLanguages: ProjectCreateResolveGuard },
    data: { title: 'Add Project' },
  },
  {
    path: 'project/:guid/benchmark-description',
    component: BenchmarkDescriptionComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'project/:guid/measurements-table',
    component: MeasurementsTableComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'project/:guid/log',
    component: ProjectLogComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'project/:guid',
    component: ProjectDetailComponent,
    canActivate: [AuthenticationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
