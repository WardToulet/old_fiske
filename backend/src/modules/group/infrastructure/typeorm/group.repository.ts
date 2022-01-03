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

	readonly relations: string[] = [ 'privilegedAccounts' ];

	// FIXME: this does not work atm
	protected prepareQuery(
		params:  QueryParams<GroupProps>
	): WhereCondition<TypeormGroup> {
		const where: QueryParams<TypeormGroup> = {};

		if(params.id) where.id = params.id.value;

		return where;
	}
	//
	// public async findGroupsForMember(memberId: string) {
	// 	// FIXME: I' wast trying to use the query runner but this does not seem to work
	// 	// temorarily using raw (escped) sql
	// 
	// 	// const groups = this.repository.createQueryBuilder('groups')
	// 	// 	.innerJoin(
	// 	// 			'groups.id', 
	// 	// 			'groups_members_members.groupsId', 
	// 	// 			'groups_members_members.membersId = memberId', 
	// 	// 			{ memberId }
	// 	// 	)
	// 	// 	.printSql()
	// 	// 	.getMany()
	// 
	// 	const groups = this.repository
	// 		.query(`
	// 			SELECT g.* from groups g
	// 				INNER JOIN groups_members_members gm ON gm.groupsId = g.id
	// 				WHERE gm.membersId = "60a03989-d07c-4dda-bbc2-243a5f793b8e"
	// 		`)
	// 		.then(response => { 
	// 			// FIXME: see how this handles no found groups
	// 			if(!Array.isArray(response)) { 
	// 				throw new Error('Invalid query response')
	// 			} else {
	// 				return response
	// 			}
	// 		})
	// 		.then(groups => groups.map(this.mapper.toDomainEntity.bind(this.mapper)))
	//
	// 		console.log(await groups);
	// }
}

