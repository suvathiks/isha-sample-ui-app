import { Injectable } from "@angular/core";
import { HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { generateRequestId, getApiPath } from "./cache.functions";
import { cacheableItem, Cache } from "./cache.model";
import { Select, Store } from "@ngxs/store";
import { CacheState } from "./state/cache.state";
import {
  FetchCache,
  SetCache,
  DeleteCache,
  InvalidateCacheItems
} from "./state/cache.actions";

@Injectable({
  providedIn: "root"
})
export class CacheStoreService {
  @Select(CacheState.cachedResponses)
  cachedResponses$: Observable<Cache[]>;
  constructor(private store: Store) {}
  /**
   * Takes in a HttpRequest and fetches a HttpResponse from stored cache for it, if any exists.
   * @param request
   */
  fetchCache(request: HttpRequest<any>): HttpResponse<any> {
    let requestId = generateRequestId(request);
    let cache = null;
    this.cachedResponses$.subscribe(value => {
      const cachedResponses = value;
      cache = cachedResponses.find(c => c.requestId === requestId);
    });
    if (cache) {
      const expired = hasExpired(cache.expiresAt);
      if (!expired) {
        return deepCopyHttpResponse(cache.response);
      } else {
        this.store.dispatch(new DeleteCache(requestId));
      }
    }
    return null;
  }
  /**
   * Takes in a requestId, which is a unique key for the request,
   * and its successful response, and then stores its response in storage.
   * @param requestId
   * @param response
   * @param expiresIn
   */
  setCache(
    requestId: string,
    response: HttpResponse<any>,
    expiresIn: number
  ): void {
    this.store.dispatch(new SetCache(requestId, response, expiresIn));
  }
  /**
   * Takes an array of cacheItems and deletes stored caches belonging to them.
   */
  deleteCacheItems = (cacheItems: cacheableItem[]): void => {
    this.store.dispatch(new InvalidateCacheItems(cacheItems));
  };
}

/*
 * Checks whether a date string is expired.
 * Returns true if it is expired, and false if not.
 */
const hasExpired = expiresAt => {
  let date = new Date();
  let expiryDate = new Date(expiresAt);
  const currentTime = date.getTime();
  const expiryTime = expiryDate.getTime();
  if (expiryTime > currentTime) {
    return false;
  } else {
    return true;
  }
};

/*
 * Returns a deep clone of the HTTP response
 */
const deepCopyHttpResponse = (
  response: HttpResponse<any>
): HttpResponse<any> => {
  return new HttpResponse({
    body: response.body,
    headers: response.headers,
    status: response.status,
    statusText: response.statusText,
    url: response.url
  });
};
