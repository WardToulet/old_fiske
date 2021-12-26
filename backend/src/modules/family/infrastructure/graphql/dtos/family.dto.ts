import { Field, ObjectType } from '@nestjs/graphql';

import { AccountDTO } from '@module/account/infrastructure/graphql/dtos/account.dto';
import { MemberDTO } from '@module/members/infrastructure/graphql/dtos/member.dto';

import { Family } from "../../../domain/entities/family.entity";

@ObjectType('Family')
export class FamilyDTO {
	constructor(account: Family) {
		const props = account.getPropsCopy();

		this.accounts = props.accounts.map(account => new AccountDTO(account)) ?? [];
		this.members = props.members.map(member => new MemberDTO(member)) ?? [];

		this.id = account.id.value;
	}

	@Field()
	id: string;

	@Field(_type => [MemberDTO], { nullable: false })
	members: MemberDTO[];

	@Field(_type => [AccountDTO], { nullable: false })
	accounts: AccountDTO[];
}
