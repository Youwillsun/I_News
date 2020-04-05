import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppMinimize } from '@ionic-native/app-minimize/ngx'

import { AppRoutingModule } from './app-routing.module';

import { NgxEchartsModule } from 'ngx-echarts';

import { QuillModule } from 'ngx-quill';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxEchartsModule,
    FormsModule,
    HttpClientModule,
    QuillModule.forRoot(),
    IonicModule.forRoot({ mode: 'ios' })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AppMinimize,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
