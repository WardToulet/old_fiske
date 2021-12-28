import {  Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberService } from './domain/member.service';
import { MemberResolver } from './infrastructure/graphql/member.resolver';
import { TypeormMember } from './infrastructure/typeorm/member.typeorm.entity';
import { MemberRepository } from './infrastructure/typeorm/member.repository';

@Module({
	imports: [ 
		TypeOrmModule.forFeature([ TypeormMember ]),
	],
	providers: [
		MemberService, 
		MemberResolver,
		MemberRepository,
	],
	exports: [
		MemberService,
	]
})
export class MemberModule {}
