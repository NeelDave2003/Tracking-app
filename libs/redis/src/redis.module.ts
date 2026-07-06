import { Global, Module } from '@nestjs/common';
import { RedisModule as NestRedisModule } from '@nestjs-modules/ioredis';

import { RedisService } from './redis.service';
import { AppConfigService, AppConfigModule } from 'libs/config';

@Global()
@Module({
    imports: [
        AppConfigModule,

        NestRedisModule.forRootAsync({
            imports: [AppConfigModule],
            inject: [AppConfigService],
            useFactory: (config: AppConfigService) => ({
                type: 'single',
                url: `redis://${config.redis.host}:${config.redis.port}`,
            }),
        }),
    ],
    providers: [RedisService],
    exports: [NestRedisModule, RedisService],
})
export class RedisModule { }