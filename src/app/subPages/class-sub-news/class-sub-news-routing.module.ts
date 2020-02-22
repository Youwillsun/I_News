import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassSubNewsPage } from './class-sub-news.page';

const routes: Routes = [
  {
    path: '',
    component: ClassSubNewsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassSubNewsPageRoutingModule {}
