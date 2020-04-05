import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppProtocolPageRoutingModule } from './app-protocol-routing.module';

import { AppProtocolPage } from './app-protocol.page';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderModule,
    AppProtocolPageRoutingModule
  ],
  declarations: [AppProtocolPage]
})
export class AppProtocolPageModule {}
