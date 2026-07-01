import { Module } from '@nestjs/common';

import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { DatabaseModule } from 'app/persistence';
import { ConfigModule } from 'libs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    UsersModule,
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule { }
