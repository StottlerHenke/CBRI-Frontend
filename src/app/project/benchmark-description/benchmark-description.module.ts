import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BenchmarkDescriptionComponent } from './benchmark-description.component';
import { BenchmarkDescriptionService } from './benchmark-description.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BenchmarkDescriptionComponent],
  providers: [BenchmarkDescriptionService],
})
export class BenchmarkDescriptionModule { }
