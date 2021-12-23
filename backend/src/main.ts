import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(new ValidationPipe());

	// TODO: fix this with a dev wrapper
	app.enableCors();

	await app.listen(8080);
}
bootstrap();
