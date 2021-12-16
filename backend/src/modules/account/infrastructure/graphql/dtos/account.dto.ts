import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Account')
export class AccountDTO {
	constructor(member: { email: string, password: string }) {
		// Set first- and lastname
		this.email = member.email;
	}

	@Field()
	email: string;
}
