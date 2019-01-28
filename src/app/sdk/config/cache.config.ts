import { endpoints } from "./api.config";
import { cacheableItem } from "./../features/caching/cache.model";

// Default expiry of cache in seconds
export const defaultExpiry = 3600;

/**
 * List of apiPaths that will be cached.
 * See cacheItem model for descriptions on the properties.
 */
export const cacheWhitelist: cacheableItem[] = [
  {
    name: "constantTypes",
    apiPath: endpoints.constantTypes.fetch,
    invalidatedBy: [],
    expiresIn: 3600 * 24 * 7 * 4
  },
  {
    name: "constantValues",
    apiPath: endpoints.constantValues.fetch,
    invalidatedBy: [],
    expiresIn: 3600 * 24 * 7 * 4
  },
  {
    name: "programs",
    apiPath: endpoints.programs.fetch,
    invalidatedBy: [endpoints.programs.create, endpoints.programs.update],
    expiresIn: 3600
  }
];
