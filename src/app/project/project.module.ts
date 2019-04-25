import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NvD3Module } from 'ng2-nvd3';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { SharedModule } from '../shared/shared.module';

import { BenchmarkDescriptionModule } from './benchmark-description/benchmark-description.module';
import { MeasurementsTableModule } from './measurements-table/measurements-table.module';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectCreateResolveGuard } from './project-create/project-create-resolve.guard';
import { ProjectUpdateComponent } from './project-update/project-update.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectService } from './project.service';

import 'd3';
import 'nvd3';


@NgModule({
  imports: [
    SharedModule,
    NvD3Module,
    Ng2GoogleChartsModule,
    ProjectRoutingModule,
    BenchmarkDescriptionModule,
    MeasurementsTableModule,
  ],
  declarations: [ProjectCreateComponent, ProjectUpdateComponent,
    ProjectListComponent, ProjectDetailComponent],
  providers: [ProjectService, ProjectCreateResolveGuard]
})
export class ProjectModule { }
