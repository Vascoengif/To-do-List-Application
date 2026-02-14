import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { initializeTransactionalContext } from 'typeorm-transactional';

async function bootstrap() {
  initializeTransactionalContext();
  
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({ origin: true });
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
      transform: true,
    }),
  );
  
  const port = process.env.PORT ?? 3003;
  const host = process.env.HOST ?? 'localhost';
  await app.listen(port);
  
  const logger = new Logger('Bootstrap');
  logger.log(`🚀 Application is running on: http://${host}:${port}`);
}
bootstrap();
