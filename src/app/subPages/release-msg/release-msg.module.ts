import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReleaseMsgPageRoutingModule } from './release-msg-routing.module';

import { ReleaseMsgPage } from './release-msg.page';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderModule,
    ReleaseMsgPageRoutingModule
  ],
  declarations: [ReleaseMsgPage]
})
export class ReleaseMsgPageModule {}
