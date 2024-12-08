import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4000',  // Permitir requisições dessa origem específica
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Se estiver usando cookies ou autenticação com credenciais
  });
  await app.listen(3000);
}
bootstrap();
