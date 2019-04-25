import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeasurementsTableComponent } from './measurements-table.component';
import { MeasurementsTableService } from './measurements-table.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MeasurementsTableComponent],
  providers: [MeasurementsTableService],
})
export class MeasurementsTableModule { }
