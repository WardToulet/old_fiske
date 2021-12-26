import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { QueryParams } from "@base/module/ports/repository.port.base";
import { TypeormRepository, WhereCondition } from "@base/typeorm";

import { Group, GroupProps } from "../../domain/entities/group.entity";
import { GroupRepositoryPort } from "../../domain/ports/group.repository.port";
import { TypeormGroup } from "./group.typeorm.entity";
import { GroupMapper } from "./group.mapper";

@Injectable()
export class GroupRepository
	extends TypeormRepository<Group, GroupProps, TypeormGroup>
	implements GroupRepositoryPort 
{
	constructor(
		@InjectRepository(TypeormGroup)
		groupRepository: Repository<TypeormGroup>,
	) {
		super(
			groupRepository,	
			new GroupMapper()
		)
	}

	readonly relations: string[] = [ 'members' ];

	// FIXME: this does not work atm
	protected prepareQuery(
		params:  QueryParams<GroupProps>
	): WhereCondition<TypeormGroup> {
		const where: QueryParams<TypeormGroup> = {};

		if(params.id) where.id = params.id.value;

		return where;
	}
}

