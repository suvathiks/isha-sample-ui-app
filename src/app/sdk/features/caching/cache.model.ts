import { HttpResponse } from "@angular/common/http";

/** This is the model of what is cached
 * @param {string} apiPath The path to which the cached response belongs
 * @param {string} expiresAt This is the date time string at which the cache will expire
 * @param {HttpResponse<any>} HttpResponse This is the response that is cached
 */
export class Cache {
  requestId: string;
  apiPath: string;
  expiresAt: string;
  response: HttpResponse<any>;
}

/**
 * @param {string} apiPath This is the path to cache when response is successful
 * @param {string} invalidatedBy Array of paths whose successful response will invalidate the cache for the apiPath
 * @param {number} expiresIn expiry time of the cache (in seconds)
 */
export class cacheableItem {
  name: string = "";
  apiPath: string = "";
  invalidatedBy: string[];
  expiresIn: number;
}
