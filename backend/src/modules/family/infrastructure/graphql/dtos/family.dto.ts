import { ObjectType, Field } from "@nestjs/graphql";

import { Family }  from "../../../domain/entities/family.entity";

import { AccountDTO } from "@module/account/infrastructure/graphql/dtos/account.dto";
import { MemberDTO } from "@module/members/infrastructure/graphql/dtos/member.dto";

@ObjectType('Family')
export class FamilyDTO {
	constructor(family: Family) {
		const props = family.getPropsCopy();

		// this.members = props.members.map(member => new MemberDTO(member));
		// this.accounts = props.accounts.map(account => new AccountDTO(account));
		this.members = [];
		this.accounts = [];
	}
	

	@Field(_type => [MemberDTO])
	members: MemberDTO[];

	@Field(_type => [AccountDTO])
	accounts: AccountDTO[];
}
