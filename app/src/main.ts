import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });

    app.enableCors({
        // origin: [
        //     'http://localhost:4200',
        //     'http://10.10.0.16',
        //     'http://10.10.0.7',
        //     'http://localhost',
        //     'http://10.10.0.21',
        // ],

        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type, Accept',
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        }),
    );
    await app.listen(process.env.APP_PORT);
    console.log(`Sever on port: ${await app.getUrl()}`);
}
bootstrap();
