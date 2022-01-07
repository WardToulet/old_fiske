import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { loadPackage } from '@nestjs/common/utils/load-package.util';

// const { ApolloGateway } = loadPackage(
// 	'@apollo/gateway',
// 	'ApolloGateway',
// 	() => require('@apollo/gateway'),
// );


async function bootstrap() {
	const gateway = await require('@apollo/gateway');

	console.log(gateway)

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
