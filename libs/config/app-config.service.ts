import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
    constructor(private readonly config: ConfigService) { }

    get database() {
        return {
            url: this.config.getOrThrow<string>('DATABASE_URL'),
        };
    }

    get grpc() {
        return {
            user: {
                host: this.config.getOrThrow<string>('USER_GRPC_HOST'),
                port: this.config.get<number>('USER_GRPC_PORT', 50051),
                get address() {
                    return `${this.host}:${this.port}`;
                },
            },

            tracking: {
                host: this.config.getOrThrow<string>('TRACKING_GRPC_HOST'),
                port: this.config.get<number>('TRACKING_GRPC_PORT', 50052),
                get address() {
                    return `${this.host}:${this.port}`;
                },
            },

            notification: {
                host: this.config.getOrThrow<string>('NOTIFICATION_GRPC_HOST'),
                port: this.config.get<number>('NOTIFICATION_GRPC_PORT', 50053),
                get address() {
                    return `${this.host}:${this.port}`;
                },
            },
        };
    }

    get gateway() {
        return {
            port: this.config.get<number>('GATEWAY_PORT', 3000),
        };
    }

    get redis() {
        return {
            host: this.config.getOrThrow<string>('REDIS_HOST'),
            port: this.config.get<number>('REDIS_PORT', 6379),
        };
    }

    get kafka() {
        return {
            broker: this.config.getOrThrow<string>('KAFKA_BROKER'),
        };
    }
}