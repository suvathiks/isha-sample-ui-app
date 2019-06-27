import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SdkModule } from "./sdk/sdk.module";
import { NgxsModule } from "@ngxs/store";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { HomeModule } from "./modules/home/home.module";
import { ContactState } from "./state/contacts/contacts.state";
import { environment } from "../environments/environment";
import { ConstantParsingService } from "./services/constant-parsing.service";
import { HttpClientModule } from '@angular/common/http';
import { ConstantState } from './state/constants/constants.state';
import {StylingModule} from './shared/styling.imports';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    StylingModule,
    AppRoutingModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsModule.forRoot([ConstantState, ContactState], {
      developmentMode: !environment.production
    }),
    // HttpClientModule,
    SdkModule // Includes all the sdk features from src/app/sdk
  ],
  providers: [ConstantParsingService],
  bootstrap: [AppComponent]
})
export class AppModule {}
