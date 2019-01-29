import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SdkModule } from "./sdk/sdk.module";
import { NgxsModule } from "@ngxs/store";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsModule.forRoot([]),
    SdkModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
