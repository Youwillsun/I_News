import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CommentComponent } from './comment.component';


@NgModule({
  declarations: [CommentComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [CommentComponent]
})
export class CommentModule { }