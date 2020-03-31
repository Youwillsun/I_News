import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReleaseNewsPageRoutingModule } from './release-news-routing.module';

import { ReleaseNewsPage } from './release-news.page';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderModule,
    ReleaseNewsPageRoutingModule
  ],
  declarations: [ReleaseNewsPage]
})
export class ReleaseNewsPageModule {}
