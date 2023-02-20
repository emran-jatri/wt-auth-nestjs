import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  console.log('process.env.NODE_ENV', process.env.NODE_ENV);
  console.log('process.env.NODE_ENV', configService.get('PORT'));

  await app.listen(3000);
}
bootstrap();
