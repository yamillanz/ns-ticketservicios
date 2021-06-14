import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,
    {
      logger:  true //[`error`, `warn`, `debug`, `verbose`]
    });
  await app.listen(3006);
}
bootstrap();
