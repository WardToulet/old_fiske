import { Field, ObjectType } from '@nestjs/graphql';

import { MemberDTO } from '@module/member/infrastructure/graphql/dtos/member.dto';

import { Group } from "../../../domain/entities/group.entity";
import { PrivilegedAccountDTO } from './privileged-account.dto';

@ObjectType('Group')
export class GroupDTO {
	constructor(group: Group) {
		const props = group.getPropsCopy();

		this.members = props.members.then(members => 
			members.map(member => new MemberDTO(member)) ?? []
		);

		this.privilegedAccouts = props.privilegedAccounts.then(privilegedAccouts =>
			privilegedAccouts.map(privilegedAccout => new PrivilegedAccountDTO(privilegedAccout))
		);

		this.id = group.id.value;
	}

	@Field()
	id: string;

	@Field(_type => [MemberDTO], { nullable: false })
	members: Promise<MemberDTO[]>;

	@Field(_type => [PrivilegedAccountDTO], { nullable: false })
	privilegedAccouts: Promise<PrivilegedAccountDTO[]>;
}
