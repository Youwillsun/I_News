import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { IndexPage } from './index.page';
import { HeaderModule } from '../components/header/header.module';
import { NewsModule } from '../components/news/news.module';
import { NodataModule } from '../components/nodata/nodata.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderModule,
    NewsModule,
    NodataModule,
    RouterModule.forChild([{ path: '', component: IndexPage }])
  ],
  declarations: [IndexPage]
})
export class IndexPageModule { }
