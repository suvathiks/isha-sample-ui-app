import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Select, Store } from "@ngxs/store";
import { KeycloakState } from "./keycloak.state";

@Injectable()
/**
 * This will automatically intercept all outbound HTTP requests
 * and inject the latest keycloak token into the Authorization Header
 */
export class TokenInterceptor implements HttpInterceptor {
  @Select(KeycloakState.token)
  token$: Observable<string>;
  token: string;
  constructor() {
    this.token$.subscribe(value => {
      this.token = value;
    });
  }
  // Function to intercept the Http request...
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Cloning the request and setting the Authorization property in the headers...
    request = request.clone({
      setHeaders: {
        Authorization: this.token
      }
    });
    // Letting it move on to the next step...
    return next.handle(request);
  }
}
