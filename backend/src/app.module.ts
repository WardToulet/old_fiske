import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeGraphQLModule } from 'typegraphql-nestjs';

import { MemberModule } from '@module/member/member.module';
import { AccountModule } from '@module/account/account.module';
import { AuthenticationModule } from '@module/authentication/authentication.module';
import { FamilyModule } from '@module/family/family.module';
import { GroupModule } from '@module/group/group.module';
import { AuthroizationModule } from '@module/authorization/authorization.module';

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
			// logging: true,
		}),

		// GraphQLModule.forRoot({
		// 	autoSchemaFile: true,
		// }),
		TypeGraphQLModule.forRoot({}),

		AuthenticationModule,
		AuthroizationModule,
		AccountModule,
		MemberModule,
		FamilyModule,
		GroupModule,
	],
})
export class AppModule {}
