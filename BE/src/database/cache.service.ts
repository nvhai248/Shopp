import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService implements OnModuleInit {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async onModuleInit() {}

  async get(key: string): Promise<any> {
    return this.cacheManager.get(key);
  }

  async set(key: string, value: any, options?: { ttl: number }): Promise<void> {
    if (options && options.ttl) {
      await this.cacheManager.set(key, value, options.ttl);
    } else {
      await this.cacheManager.set(key, value);
    }
  }

  async del(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  async reset(): Promise<void> {
    await this.cacheManager.reset();
  }
}
