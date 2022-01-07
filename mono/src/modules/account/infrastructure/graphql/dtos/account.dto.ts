import { Field, ObjectType } from '@nestjs/graphql';
import { Account } from "../../../domain/entities/account.entity";

@ObjectType('Account', { isAbstract: true })
export class AccountDTO {
	constructor(account: Account) {
		const props = account.getPropsCopy();

		this.email = props.email.value;
		this.id = account.id.value;
	}

	@Field()
	id: string;

	@Field()
	email: string;
}
