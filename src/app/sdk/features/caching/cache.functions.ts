import { baseUrl } from "./../../config/api.config";
import { HttpRequest } from "@angular/common/http";
import { cacheableItem } from "./cache.model";
import { cacheWhitelist, defaultExpiry } from "./../../config/cache.config";

/** In a requestId for post requests,
 * this string is used to separate the url from request body
 * */
const urlParamSeparator: string = "ENDOFURL";

/**
 * Takes in a request and outputs a unique Id using url and params
 * @param request
 */
export const generateRequestId = (request: HttpRequest<any>): string => {
  let requestId = null;
  if (request.method === "GET") {
    requestId = request.url;
  } else {
    requestId = `${request.url}${urlParamSeparator}${JSON.stringify(
      request.body
    )}`;
  }
  return requestId;
};

/**
 * Takes in a URL and returns the API endpoint path
 * @param url
 */
export const getPathFromUrl = (url: string): string => {
  let path = null;
  path = url.replace(baseUrl, "");
  return path;
};

/**
 * Takes in a unique requestId and returns the API endpoint path
 * @param requestId
 */
export const getApiPath = (requestId: string): string => {
  let url = requestId.split(urlParamSeparator)[0];
  let apiPath = getPathFromUrl(url);
  return apiPath;
};

/**
 * Takes in a request and returns boolean
 * stating whether the request is cacheable or not
 * @param request
 */
export const isRequestCacheable = (request: HttpRequest<any>): boolean => {
  let url = request.url;
  let cacheable = false;
  let cacheItem = cacheWhitelist.find(item => {
    return url.endsWith(item.apiPath);
  });
  if (cacheItem) {
    cacheable = true;
  }
  return cacheable;
};

/**
 * Takes in a url and returns the path that
 * a successful response to that url should invalidate
 * @param url
 */
export const getInvalidatePaths = (url: string): cacheableItem[] => {
  let path = getPathFromUrl(url);
  let invalidatePaths = [];
  let invalidateItems = cacheWhitelist.filter(item => {
    if (item.invalidatedBy.length) {
      if (item.invalidatedBy.includes(path)) {
        return true;
      }
    }
  });
  return invalidateItems;
};

/**
 * Takes in a request and returns the expiry time
 * for that request as defined in the cacheWhitelist
 * @param request
 */
export const getRequestExpiryTime = (request: HttpRequest<any>): number => {
  const url = request.url;
  const match = cacheWhitelist.find(item => {
    return url.endsWith(item.apiPath);
  });
  if (match) {
    return match.expiresIn;
  } else return defaultExpiry;
};
