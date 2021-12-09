import { TypeormRepository, WhereCondition } from '@base/typeorm';
import { Injectable } from '@nestjs/common';
import { MembersRepositoryPort } from '../../domain/ports/member.repository.port';
import { Member, MemberProps } from '../../domain/entities/member.entity';
import { TypeormMember } from './member.typeorm.entity';
import { QueryParams } from '@base/module';
import { MemberMapper } from './member.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MembersRepository 
	extends TypeormRepository<Member, MemberProps, TypeormMember>
	implements MembersRepositoryPort 
{
	constructor(
		@InjectRepository(TypeormMember)
		private readonly memberRepository: Repository<TypeormMember>
	) {
		super(
			memberRepository,
			new MemberMapper(Member, TypeormMember)
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
