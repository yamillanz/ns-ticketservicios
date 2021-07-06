import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors({
		origin: [
			'http://localhost:4200', // angular
		],
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
