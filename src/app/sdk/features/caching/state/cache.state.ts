import { State, Action, StateContext, Selector } from "@ngxs/store";
import { Cache, cacheableItem } from "./../cache.model";
import { HttpRequest, HttpResponse } from "@angular/common/http";
import { generateRequestId, getApiPath } from "./../cache.functions";
import {
  FetchCache,
  SetCache,
  DeleteCache,
  InvalidateCacheItems
} from "./cache.actions";

export class CacheStateModel {
  cachedResponses: Cache[];
}

@State<CacheStateModel>({
  name: "cache",
  defaults: {
    cachedResponses: []
  }
})
export class CacheState {
  constructor() {}
  @Selector()
  static cachedResponses(state: any) {
    return state.cachedResponses;
  }

  /**
   * Takes in a HttpRequest and fetches a HttpResponse from stored cache for it, if any exists.
   * @param request
   */
  @Action(FetchCache)
  fetchCache(
    { getState, setState }: StateContext<CacheStateModel>,
    { request }: FetchCache
  ): HttpResponse<any> {
    let requestId = generateRequestId(request);
    const state = getState();
    const cachedResponses = state.cachedResponses;
    let cache = cachedResponses.find(c => c.requestId == requestId);
    if (cache) {
      const expired = hasExpired(cache.expiresAt);
      if (!expired) {
        return deepCopyHttpResponse(cache.response);
      } else {
        const newCachedResponses = cachedResponses.filter(
          c => c.requestId !== requestId
        );
        setState({ ...state, cachedResponses: newCachedResponses });
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
  @Action(SetCache)
  setCache(
    { getState, setState }: StateContext<CacheStateModel>,
    { requestId, response, expiresIn }: SetCache
  ): void {
    const state = getState();
    const cachedResponses = state.cachedResponses;
    const newResponse = deepCopyHttpResponse(response);
    let expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + expiresIn);
    const apiPath = getApiPath(requestId);
    const cache = {
      requestId: requestId,
      apiPath: apiPath,
      expiresAt: expiresAt.toString(),
      response: response
    };
    const newCachedResponses = cachedResponses.push(cache);
  }

  /**
   * Takes a requestId and deletes the specific cache which that requestId belongs to
   */
  @Action(DeleteCache)
  deleteCache(
    { getState, setState }: StateContext<CacheStateModel>,
    { requestId }: DeleteCache
  ): void {
    const state = getState();
    const cachedResponses = state.cachedResponses;
    let newCachedResponses = cachedResponses.filter(
      c => c.requestId !== requestId
    );
    setState({ ...state, cachedResponses: newCachedResponses });
  }

  /**
   * Takes an array of cacheItems and deletes stored caches belonging to them.
   */
  @Action(InvalidateCacheItems)
  deleteCacheItems(
    { getState, setState }: StateContext<CacheStateModel>,
    { cacheItems }: InvalidateCacheItems
  ): void {
    const state = getState();
    const cachedResponses = state.cachedResponses;
    let newCachedResponses = cachedResponses;
    if (cacheItems.length) {
      cacheItems.map(item => {
        const path = item.apiPath;
        newCachedResponses = newCachedResponses.filter(
          c => !c.requestId.includes(path)
        );
      });
    }
    setState({ ...state, cachedResponses: newCachedResponses });
  }
}

/*
 * Checks whether a date is expired.
 * Returns true if it is expired, and false if not.
 */
const hasExpired = (expiresAt: string) => {
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
