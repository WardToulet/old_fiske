import { UUID } from "@base/module/value-objects/uuid.value-object";
import { EntityProps, OrmEnitytProps, OrmMapper } from "@base/typeorm";

import { MemberMapper } from "@module/members/infrastructure/typeorm/member.mapper";

import { Group, GroupProps } from "../../domain/entities/group.entity";
import { TypeormGroup } from "./group.typeorm.entity";

export class GroupMapper extends OrmMapper<Group, TypeormGroup> {
	private readonly memberMapper  = new MemberMapper();

	constructor() {
		super(Group, TypeormGroup);
	}

	protected toDomainProps(ormEntity: TypeormGroup): EntityProps<unknown> {
		const id = new UUID(ormEntity.id); 
		const props: GroupProps = {
			members: ormEntity.members?.map(this.memberMapper.toDomainEntity.bind(this.memberMapper)),
		};

		return { id, props };
	}

	protected toOrmProps(domainEntity: Group): OrmEnitytProps<TypeormGroup> {
		const props = domainEntity.getPropsCopy();

		// console.log(props.members.map(member => member.getPropsCopy().firstname));

		return {
			members: props.members?.map(this.memberMapper.toOrmEntity.bind(this.memberMapper)),
		}
	}
}
