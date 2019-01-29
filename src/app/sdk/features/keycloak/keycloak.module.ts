import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgxsModule } from "@ngxs/store";
import { CommonModule } from "@angular/common";
import { KeycloakState } from "./keycloak.state";
import { KeycloakService } from "./keycloak.service";
import { TokenInterceptor } from "./token.interceptor";
@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([KeycloakState])],
  declarations: [],
  providers: [
    KeycloakService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class KeycloakModule {}
