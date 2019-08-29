import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

import { LocalStorageModule } from 'angular-2-local-storage';
import { FlashMessagesService } from 'ngx-flash-messages';

import { CoreModule } from './shared/core/core.module';
import { SharedModule } from './shared/shared.module';

import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { AuthenticationGuard } from './authentication.guard';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    UserModule,
    ProjectModule,
    LocalStorageModule.forRoot({
        prefix: 'cbri',
        storageType: 'localStorage',
    }),
    AppRoutingModule
  ],
  providers: [Title, AppService, AuthenticationGuard, FlashMessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
