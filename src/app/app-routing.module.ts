import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/project/list'
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { title: '404 Not Found' },
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  declarations: [],
  providers: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
