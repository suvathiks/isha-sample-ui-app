import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { GlobalErrorHandler } from "./global-error-handler.service";
import { HeaderInjector } from "./header-injection-intercepter";
import { ErrorNotification } from "./error-notification.service";
import { MatSnackBarModule } from "@angular/material";
import { MatSnackBar } from "@angular/material";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatSnackBarModule, HttpClientModule],
  providers: [
    GlobalErrorHandler,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInjector,
      multi: true
    },
    ErrorNotification
  ]
})
export class ApiModule {}
