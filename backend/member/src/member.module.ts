import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLFederationModule } from '@nestjs/graphql';

import { MemberService } from './domain/member.service';
import { MemberResolver } from './infrastructure/graphql/member.resolver';
import { TypeormMember } from './infrastructure/typeorm/member.typeorm.entity';
import { MemberRepository } from './infrastructure/typeorm/member.repository';

@Module({
	imports: [ 
		TypeOrmModule.forRoot({
			type: 'sqlite',
			database: 'member.db',
			autoLoadEntities: true,
			synchronize: true,
		}),
		TypeOrmModule.forFeature([ TypeormMember ]),
		GraphQLFederationModule.forRoot({
			// FIXME: this should use build subgraph schema
			autoSchemaFile: true,
		}),
	],
	providers: [
		MemberService, 
		MemberResolver,
		MemberRepository,
	],
})
export class MemberModule {}
