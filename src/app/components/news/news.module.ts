import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { NewsComponent } from './news.component';




@NgModule({
  declarations: [NewsComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [NewsComponent]
})
export class NewsModule { }
