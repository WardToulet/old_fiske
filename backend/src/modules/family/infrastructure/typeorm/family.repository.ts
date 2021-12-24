import { QueryParams } from "@base/module";
import { TypeormRepository, WhereCondition } from "@base/typeorm";

import { Family, FamilyProps } from "../../domain/entities/family.entity";
import { FamilyRepositoryPort } from "../../domain/ports/family.repository.port";

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { FamilyMapper } from "./family.mapper";
import { TypeormFamily } from "./family.typeorm.entity";

@Injectable()
export class FamilyRepository
	extends TypeormRepository<Family, FamilyProps, TypeormFamily>
	implements FamilyRepositoryPort 
{
	constructor(
		@InjectRepository(TypeormFamily)
		accountRepository: Repository<TypeormFamily>,
	) {
		super(
			accountRepository,	
			new FamilyMapper()
		)
	}

	readonly relations: string[] = [];

	protected prepareQuery(
		params:  QueryParams<FamilyProps>
	): WhereCondition<TypeormFamily> {
		const where: QueryParams<TypeormFamily> = {};

		if(params.id) where.id = params.id.value;
		if(params.createdAt) where.createdAt = params.createdAt.value;

		return where;
	}
}

