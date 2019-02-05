import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { ApiModule } from "./features/api/api.module";
import { CachingModule } from "./features/caching/caching.module";
import { NavigationModule } from "./features/navigation/navigation.module";
import { KeycloakModule } from "./features/keycloak/keycloak.module";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { BrowserModule } from "@angular/platform-browser";
import {MasterFormModule} from "./features/master-form/master-form.module";
import {TableModule} from "./features/table/table.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ApiModule,
    CachingModule,
    NavigationModule,
    KeycloakModule,
    MasterFormModule,
    TableModule,
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: []
})
export class SdkModule {}
