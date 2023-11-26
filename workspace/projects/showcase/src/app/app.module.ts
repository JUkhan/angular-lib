import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http'
import { FuseAlertModule } from '@streamstech/ui-sdk/fuse/alert';
import { IconsModule } from './icons.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    HttpClientModule,
    IconsModule,
  
    FuseAlertModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
