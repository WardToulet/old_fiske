import { Module } from '@nestjs/common';
import { GraphQLGatewayModule } from '@nestjs/graphql';

@Module({
  imports: [
		GraphQLGatewayModule.forRoot({
			server: {
				cors: true,
			},
			gateway: {
				serviceList: [ 
					// { 
					// 	name: 'member', 
					// 	url: 'http://localhost:8001/graphql',
					// },
				],
			},
		}),
	],
  controllers: [],
  providers: [],
})
export class AppModule {}
