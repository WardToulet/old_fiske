import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MemberModule } from './member.module';

async function bootstrap() {
	const app = await NestFactory.create(MemberModule);

	app.useGlobalPipes(new ValidationPipe());

	if(process.env.DEV)
		app.enableCors();

	await app.listen(8001);
}
bootstrap();
