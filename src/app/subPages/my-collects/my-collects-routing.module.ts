import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyCollectsPage } from './my-collects.page';

const routes: Routes = [
  {
    path: '',
    component: MyCollectsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCollectsPageRoutingModule {}
