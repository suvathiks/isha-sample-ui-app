import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SdkModule } from './sdk/sdk.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SdkModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
