import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppProtocolPage } from './app-protocol.page';

const routes: Routes = [
  {
    path: '',
    component: AppProtocolPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppProtocolPageRoutingModule {}
