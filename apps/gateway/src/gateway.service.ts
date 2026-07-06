import { Injectable, OnModuleInit } from '@nestjs/common';
import { RedisService } from 'libs/redis/src';

@Injectable()
export class GatewayService implements OnModuleInit {

  constructor(
    private readonly redisService: RedisService
  ) { }

  async onModuleInit() {
    const pong = await this.redisService.ping();

    console.log('Redis:', pong);
  }

  getHello(): string {
    return 'Hello World!';
  }


}
