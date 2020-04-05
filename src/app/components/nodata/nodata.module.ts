import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { NodataComponent } from './nodata.component';



@NgModule({
  declarations: [NodataComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [NodataComponent]
})
export class NodataModule { }
