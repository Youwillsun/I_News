import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsDetailPageRoutingModule } from './news-detail-routing.module';

import { NewsDetailPage } from './news-detail.page';
import { CommentModule } from '../../components/comment/comment.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsDetailPageRoutingModule,
    CommentModule
  ],
  declarations: [NewsDetailPage]
})
export class NewsDetailPageModule { }
