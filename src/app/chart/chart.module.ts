import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { NgxEchartsModule } from 'ngx-echarts';

import { ChartPage } from './chart.page';

import { HeaderModule } from '../components/header/header.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxEchartsModule,
    HeaderModule,
    RouterModule.forChild([{ path: '', component: ChartPage }])
  ],
  declarations: [ChartPage]
})
export class ChartPageModule { }
