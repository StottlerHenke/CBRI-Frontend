import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { UserRoutingModule } from './user-routing.module';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserUpdatePasswordComponent } from './user-update-password/user-update-password.component';
import { UserForgotPasswordComponent } from './user-forgot-password/user-forgot-password.component';
import { UserForgotUpdatePasswordComponent } from './user-forgot-update-password/user-forgot-update-password.component';
import { UserService } from './user.service';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  declarations: [UserCreateComponent, UserUpdatePasswordComponent,
    UserForgotPasswordComponent, UserForgotUpdatePasswordComponent,
    LoginComponent],
  providers: [UserService]
})
export class UserModule { }
