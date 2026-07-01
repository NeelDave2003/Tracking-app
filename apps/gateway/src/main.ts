import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { AppConfigService } from 'libs/config';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);

  const config = app.get(AppConfigService);

  await app.listen(config.gateway.port);
}
void bootstrap();
