import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MembersModule } from '@module/members';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'sqlite',
			database: 'fiske.db',
			autoLoadEntities: true,
			synchronize: true,
		}),

		GraphQLModule.forRoot({
			autoSchemaFile: true,
		}),

		MembersModule,
	],
})
export class AppModule {}
