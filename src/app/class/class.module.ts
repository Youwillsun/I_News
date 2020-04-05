import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';


import { ClassPage } from './class.page';

import { HeaderModule } from '../components/header/header.module';
import { NodataModule } from '../components/nodata/nodata.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderModule,
    NodataModule,
    RouterModule.forChild([{ path: '', component: ClassPage }])
  ],
  declarations: [ClassPage]
})
export class ClassPageModule { }
