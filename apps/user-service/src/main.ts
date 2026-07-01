import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { UserServiceModule } from './user-service.module';
import { AppConfigService, ConfigModule } from 'libs/config';
import { USER_PROTO_PATH } from 'app/proto';


async function bootstrap() {
  const context = await NestFactory.createApplicationContext(UserServiceModule);

  const config = context.get(AppConfigService);

  const grpc = config.grpc.user;
  console.log(`🚀 User Service started on grpc://${grpc.host}:${grpc.port}`);

  const app =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      UserServiceModule,
      {
        transport: Transport.GRPC,
        options: {
          package: 'user',
          protoPath: USER_PROTO_PATH,
          url: `${grpc.host}:${grpc.port}`,
        },
      },
    );

  await app.listen();

}

void bootstrap();