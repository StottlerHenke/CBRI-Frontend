import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationGuard } from '../authentication.guard';

import { UserCreateComponent } from './user-create/user-create.component';
import { UserUpdatePasswordComponent } from './user-update-password/user-update-password.component';
import { UserForgotPasswordComponent } from './user-forgot-password/user-forgot-password.component';
import { UserForgotUpdatePasswordComponent } from './user-forgot-update-password/user-forgot-update-password.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'user/register',
    component: UserCreateComponent,
    data: { title: 'Create a User Account' },
  },
  {
    path: 'user/update',
    component: UserUpdatePasswordComponent,
    canActivate: [AuthenticationGuard],
    data: { title: 'Change Password' },
  },
  {
    path: 'user/forgot-password',
    component: UserForgotPasswordComponent,
    data: { title: 'Recover Password' },
  },
  {
    path: 'user/forgot-password/update',
    component: UserForgotUpdatePasswordComponent,
    data: { title: 'Recover Password' },
  },
  {
    path: 'user/login',
    component: LoginComponent,
    data: { title: 'Sign In' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
