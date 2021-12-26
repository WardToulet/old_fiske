import { Field, ObjectType } from '@nestjs/graphql';

import { MemberDTO } from '@module/members/infrastructure/graphql/dtos/member.dto';

import { Group } from "../../../domain/entities/group.entity";

@ObjectType('Group')
export class GroupDTO {
	constructor(account: Group) {
		const props = account.getPropsCopy();

		this.members = props.members.map(member => new MemberDTO(member)) ?? [];

		this.id = account.id.value;
	}

	@Field()
	id: string;

	@Field(_type => [MemberDTO], { nullable: false })
	members: MemberDTO[];
}
