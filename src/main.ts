import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const port = configService.get('port');

    app.enableCors();
    app.use(helmet());
    await app.listen(port);
    console.log(`Server started on port ${port}`);
  } catch (error) {
    console.log(error.stack);
  }
}
bootstrap();
