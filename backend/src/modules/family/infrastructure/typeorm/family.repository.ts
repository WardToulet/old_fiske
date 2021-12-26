import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { QueryParams } from "@base/module/ports/repository.port.base";
import { TypeormRepository, WhereCondition } from "@base/typeorm";

import { Family, FamilyProps } from "../../domain/entities/family.entity";
import { FamilyRepositoryPort } from "../../domain/ports/family.repository.port";
import { TypeormFamily } from "./family.typeorm.entity";
import { FamilyMapper } from "./family.mapper";

@Injectable()
export class FamilyRepository
	extends TypeormRepository<Family, FamilyProps, TypeormFamily>
	implements FamilyRepositoryPort 
{
	constructor(
		@InjectRepository(TypeormFamily)
		familyRepository: Repository<TypeormFamily>,
	) {
		super(
			familyRepository,	
			new FamilyMapper()
		)
	}

	readonly relations: string[] = [ 'members', 'accounts' ];

	// FIXME: this does not work atm
	protected prepareQuery(
		params:  QueryParams<FamilyProps>
	): WhereCondition<TypeormFamily> {
		const where: QueryParams<TypeormFamily> = {};

		if(params.id) where.id = params.id.value;

		return where;
	}
}

