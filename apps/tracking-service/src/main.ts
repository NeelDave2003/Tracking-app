import { NestFactory } from '@nestjs/core';
import { TrackingServiceModule } from './tracking-service.module';

async function bootstrap() {
  const app = await NestFactory.create(TrackingServiceModule);
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
