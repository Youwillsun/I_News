import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReleaseNewsPage } from './release-news.page';

const routes: Routes = [
  {
    path: '',
    component: ReleaseNewsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReleaseNewsPageRoutingModule {}
