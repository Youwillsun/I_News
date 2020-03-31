import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReleaseMsgPage } from './release-msg.page';

const routes: Routes = [
  {
    path: '',
    component: ReleaseMsgPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReleaseMsgPageRoutingModule {}
