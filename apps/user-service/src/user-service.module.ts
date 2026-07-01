import { Module } from '@nestjs/common';
import { UserServiceController } from './user-service.controller';
import { UserServiceService } from './user-service.service';
import { AppConfigService, ConfigModule } from 'libs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_PROTO_PATH } from 'app/proto';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'USER_SERVICE',
        imports: [ConfigModule],
        inject: [AppConfigService],
        useFactory: (config: AppConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'user',
            protoPath: USER_PROTO_PATH,
            url: `${config.grpc.user.host}:${config.grpc.user.port}`,
          },
        }),
      },
    ])
  ],
  controllers: [UserServiceController],
  providers: [UserServiceService],
})
export class UserServiceModule { }
