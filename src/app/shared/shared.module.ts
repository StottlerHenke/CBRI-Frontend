import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from './core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from './message/message.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    MessageModule,
  ],
  declarations: [PageNotFoundComponent],
  exports: [FormsModule, ReactiveFormsModule, CommonModule, MessageModule]
})
export class SharedModule { }
