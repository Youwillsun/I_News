import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassSubNewsPageRoutingModule } from './class-sub-news-routing.module';

import { ClassSubNewsPage } from './class-sub-news.page';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderModule,
    ClassSubNewsPageRoutingModule
  ],
  declarations: [ClassSubNewsPage]
})
export class ClassSubNewsPageModule { }
