import { NestFactory } from '@nestjs/core';
import { ConnectToDatabase } from './models';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      cors: {
        origin: '*',
        methods: ['GET', 'POST', 'DELETE'],
      },
    },
  );
  await app.listen(3000);
}
ConnectToDatabase();
bootstrap();
