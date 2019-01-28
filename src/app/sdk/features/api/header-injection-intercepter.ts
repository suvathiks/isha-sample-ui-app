import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from "@angular/common/http";
import { httpOptions } from "./../../config/api.config";
import { catchError } from "rxjs/operators";
import { GlobalErrorHandler } from "./global-error-handler.service";

@Injectable()
export class HeaderInjector implements HttpInterceptor {
  constructor(private errorHandler: GlobalErrorHandler) {}

  /**
   * intercept all XHR request
   * @param request
   * @param next
   * @returns {Observable<A>}
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Setting headers on all outbound http requests...
    request = request.clone({
      setHeaders: httpOptions
    });

    // and continue with next steps in handling request...
    return next.handle(request).pipe(
      catchError(error => {
        // If something goes wrong, handle the error...
        this.errorHandler.handleError(error);
        return of(error);
      })
    );
  }
}
