import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'index',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../index/index.module').then(m => m.IndexPageModule)
          }
        ]
      },
      {
        path: 'class',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../class/class.module').then(m => m.ClassPageModule)
          }
        ]
      },
      {
        path: 'chart',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../chart/chart.module').then(m => m.ChartPageModule)
          }
        ]
      },
      {
        path: 'mine',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../mine/mine.module').then(m => m.MinePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/index',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/index',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
