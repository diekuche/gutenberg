import { get, set, del } from "idb-keyval";

export type QueryCacheConfig = {
  prefix?: string;
  cacheTime?: number;
};

export type QueryCacheItem<T> = {
  timestamp: number;
  data: T;
};

export type QueryGetParams<C, T> = {
  queryKey: string;
  queryFn: (context: C) => T | Promise<T>
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type QueryCacheRecord<C=any> = <T = any>(...args: any[]) => QueryGetParams<C, T>;

export class QueryCache {
  cacheTime: number;

  prefix: string;

  listeners: Map<string, {
    resolve: (value: unknown) => void;
    reject: (err: unknown) => void;
  }[]> = new Map();

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

  async getOrUpdate<T>({
    queryFn,
    queryKey,
    cacheTime,
  }: {
    queryKey: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    queryFn: (context: any) => T | Promise<T>;
    cacheTime?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, context: any, options?: {
    cacheTime?: number;
  }): Promise<T> {
    const listners = this.listeners.get(queryKey);
    if (listners) {
      return new Promise<T>((resolve, reject) => {
        listners.push({
          resolve: resolve as (value: unknown) => void,
          reject,
        });
      });
    }
    this.listeners.set(queryKey, []);
    try {
      let data = await this.get<T>(queryKey, {
        ...options,
        cacheTime: options?.cacheTime || cacheTime,
      });
      if (typeof data === "undefined") {
        console.log(`QueryCache:: invalidate key: ${queryKey}`);
        data = await queryFn(context);
        await this.set(queryKey, data);
      }
      this.listeners.get(queryKey)?.forEach(({ resolve }) => resolve(data));
      return data;
    } catch (e) {
      console.log(`Error when fetch key ${queryKey}`);
      console.log(e);
      this.listeners.get(queryKey)?.forEach(({ reject }) => reject(e));
      throw e;
    } finally {
      this.listeners.delete(queryKey);
    }
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
