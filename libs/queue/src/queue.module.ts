import { Global, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

import { QueueService } from './queue.service';
import { DEFAULT_QUEUE } from './constants/queue.constant';
import { AppConfigModule, AppConfigService } from 'libs/config';

@Global()
@Module({
    imports: [
        AppConfigModule,

        BullModule.forRootAsync({
            imports: [AppConfigModule],
            inject: [AppConfigService],
            useFactory: (config: AppConfigService) => ({
                connection: {
                    host: config.redis.host,
                    port: config.redis.port,
                },
            }),
        }),

        BullModule.registerQueue({
            name: DEFAULT_QUEUE,
        }),
    ],
    providers: [QueueService],
    exports: [BullModule, QueueService],
})
export class QueueModule { }