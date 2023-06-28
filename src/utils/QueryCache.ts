import { get, set, del } from "idb-keyval";

export type QueryCacheConfig = {
  prefix?: string;
  cacheTime?: number;
};

export type QueryCacheItem<T> = {
  timestamp: number;
  data: T;
};

export class QueryCache {
  cacheTime: number;

  prefix: string;

  constructor(config: QueryCacheConfig) {
    this.prefix = config.prefix || "";
    this.cacheTime = config.cacheTime || 10 * 365 * 24 * 60 * 60 * 1000; // 10 years
  }

  async get<T>(key: string, options?: {
    cacheTime?: number;
  }): Promise<T | undefined> {
    const now = new Date().getTime();
    const cacheTime = options?.cacheTime || this.cacheTime;
    const raw: string | undefined = await get(this.prefix + key);
    try {
      const item = raw ? JSON.parse(raw) : undefined;
      if (!item || now > item.timestamp + cacheTime) {
        return undefined;
      }

      return item.data;
    } catch {
      return undefined;
    }
  }

  async getOrUpdate<T>(key: string, queryFn: () => (T | Promise<T>), options?: {
    cacheTime?: number;
  }): Promise<T> {
    let data = await this.get<T>(key, options);
    if (typeof data === "undefined") {
      console.log(`QueryCache:: invalidate key: ${key}`);
      data = await queryFn();
      await this.set(key, data);
    }
    return data;
  }

  set(key: string, data: unknown) {
    return set(this.prefix + key, JSON.stringify({
      timestamp: new Date().getTime(),
      data,
    }));
  }

  delete(key: string) {
    return this.prefix + del(key);
  }
}
