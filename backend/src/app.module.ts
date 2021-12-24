import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MembersModule } from '@module/members';
import { AccountModule } from '@module/account/account.module';
import { AuthenticationModule } from '@module/authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import { FamilyModule } from '@module/family/family.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: process.env.DEV
				? '.env'
				: '.dev.env',
			isGlobal: true,
		}),

		TypeOrmModule.forRoot({
			type: 'sqlite',
			database: 'fiske.db',
			autoLoadEntities: true,
			synchronize: true,
		}),

		GraphQLModule.forRoot({
			autoSchemaFile: true,
		}),

		AccountModule,
		AuthenticationModule,
		MembersModule,
		FamilyModule,
	],
})
export class AppModule {}
