import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 app.enableCors({
    origin: [
      'https://weekly-goals.netlify.app',
      'http://localhost:5173',           
      'http://localhost:3000',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });
   app.useGlobalPipes(new ValidationPipe({
    transform: true,  
    whitelist: true, 
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
