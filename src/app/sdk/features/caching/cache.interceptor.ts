import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { CacheStoreService } from "./cache.store";
import {
  getRequestExpiryTime,
  generateRequestId,
  isRequestCacheable,
  getInvalidatePaths
} from "./cache.functions";

@Injectable({
  providedIn: "root"
})
export class CacheInterceptor implements HttpInterceptor {
  constructor(private cacheStore: CacheStoreService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let requestCacheable = isRequestCacheable(request);
    if (requestCacheable) {
      let cachedResponse = this.cacheStore.fetchCache(request);
      return cachedResponse
        ? of(cachedResponse)
        : this.handleCacheableRequest(request, next);
    } else {
      return this.handleNonCacheableRequest(request, next);
    }
  }
  /**
   * If a request is cacheable, then this function waits for it to
   * successfully resolve and then stores the response as cache.
   */
  private handleCacheableRequest = (
    request: HttpRequest<any>,
    next: HttpHandler
  ) => {
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          if (event.ok) {
            this.invalidateAppropriateCache(request);
            let requestId = generateRequestId(request);
            let expiresIn = getRequestExpiryTime(request);
            this.cacheStore.setCache(requestId, event, expiresIn);
          }
        }
      })
    );
  };
  /**
   * If a request is noncacheable, then
   * it passes through this function where appropriate
   * checks are placed on the response of such requests.
   */
  private handleNonCacheableRequest = (
    request: HttpRequest<any>,
    next: HttpHandler
  ) => {
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          if (event.ok) {
            this.invalidateAppropriateCache(request);
          }
        }
      })
    );
  };
  /**
   * Function waits for the request to successfully resolve and then
   * checks if this request is listed as an 'invalidatePath' on any other request.
   * If yes, then the cache for that request is invalidated.
   */
  private invalidateAppropriateCache = (request: HttpRequest<any>): void => {
    let invalidateItems = getInvalidatePaths(request.url);
    if (invalidateItems.length) {
      this.cacheStore.deleteCacheItems(invalidateItems);
    }
  };
}
