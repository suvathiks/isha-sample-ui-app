import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SdkModule } from "./sdk/sdk.module";
import { NgxsModule } from "@ngxs/store";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { HomeModule } from "./modules/home/home.module";
import { ProgramState } from "./state/programs/program.state";
import { environment } from "../environments/environment";
import { ConstantParsingService } from "./services/constant-parsing.service";
import { HttpClientModule } from '@angular/common/http';
import { ConstantState } from './state/constants/constants.state';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsModule.forRoot([ConstantState, ProgramState], {
      developmentMode: !environment.production
    }),
    // HttpClientModule,
    SdkModule // Includes all the sdk features from src/app/sdk
  ],
  providers: [ConstantParsingService],
  bootstrap: [AppComponent]
})
export class AppModule {}
