import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import type Redis from 'ioredis';

@Injectable()
export class RedisService {
    constructor(
        @InjectRedis()
        private readonly redis: Redis,
    ) { }

    get client(): Redis {
        return this.redis;
    }

    async ping(): Promise<string> {
        return this.redis.ping();
    }

    async get(key: string): Promise<string | null> {
        return this.redis.get(key);
    }

    async set(
        key: string,
        value: string,
        ttl?: number,
    ): Promise<'OK'> {
        if (ttl) {
            return this.redis.set(key, value, 'EX', ttl);
        }

        return this.redis.set(key, value);
    }

    async del(key: string): Promise<number> {
        return this.redis.del(key);
    }
}