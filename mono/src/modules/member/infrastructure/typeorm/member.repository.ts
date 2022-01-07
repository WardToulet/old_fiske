import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TypeormRepository, WhereCondition } from '@base/typeorm';
import { QueryParams } from '@base/module/ports/repository.port.base';

import { MembersRepositoryPort } from '../../domain/ports/member.repository.port';
import { Member, MemberProps } from '../../domain/entities/member.entity';
import { TypeormMember } from './member.typeorm.entity';
import { MemberMapper } from './member.mapper';

@Injectable()
export class MemberRepository 
	extends TypeormRepository<Member, MemberProps, TypeormMember>
	implements MembersRepositoryPort 
{
	constructor(
		@InjectRepository(TypeormMember)
		memberRepository: Repository<TypeormMember>
	) {
		super(
			memberRepository,
			new MemberMapper()
		);
	}


	protected relations: string[] = [];


	protected prepareQuery(
		params:  QueryParams<MemberProps>
	): WhereCondition<TypeormMember> {
		const where: QueryParams<TypeormMember> = {};

		if(params.id) where.id = params.id.value;
		if(params.createdAt) where.createdAt = params.createdAt.value;

		if(params.firstname) where.firstname = params.firstname;
		if(params.lastname) where.lastname = params.lastname;

		return where;
	}
}
