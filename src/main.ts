import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('main.ts', { timestamp: true });
  try {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const port = configService.get('port');

    app.enableCors();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );
    app.enableVersioning({
      type: VersioningType.URI,
    });
    app.use(helmet());
    app.use(compression());

    await app.listen(port);
    logger.log(`Server started on port ${port}`);
  } catch (error) {
    logger.error(error.stack);
  }
}
bootstrap();
