import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassSubNewsPageRoutingModule } from './class-sub-news-routing.module';

import { ClassSubNewsPage } from './class-sub-news.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassSubNewsPageRoutingModule
  ],
  declarations: [ClassSubNewsPage]
})
export class ClassSubNewsPageModule {}
