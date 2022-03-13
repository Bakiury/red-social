import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser()); // Installed package required

  app.enableCors({ // For frontend to get credentials (cookie)
    origin: 'http://localhost:8080',
    credentials: true
  });

  await app.listen(3000);
}
bootstrap();
