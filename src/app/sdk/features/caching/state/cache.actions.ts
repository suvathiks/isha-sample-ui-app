import { HttpRequest, HttpResponse } from "@angular/common/http";
import { cacheableItem } from "../cache.model";

export class FetchCache {
  static readonly type = "[CACHE] FETCH";

  constructor(public request: HttpRequest<any>) {}
}

export class SetCache {
  static readonly type = "[CACHE] SET";

  constructor(
    public requestId: string,
    public response: HttpResponse<any>,
    public expiresIn: number
  ) {}
}

export class DeleteCache {
  static readonly type = "[CACHE] DELETE";

  constructor(public requestId: string) {}
}

export class InvalidateCacheItems {
  static readonly type = "[CACHE] DELETE MULTIPLE";

  constructor(public cacheItems: cacheableItem[]) {}
}
