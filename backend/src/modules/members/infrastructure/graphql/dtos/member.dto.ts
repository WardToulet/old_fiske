import { Field, ObjectType } from '@nestjs/graphql';
import { Member } from '../../../domain/entities/member.entity';

@ObjectType('Member')
export class MemberDTO {
	constructor(member: Member) {
		// Set first- and lastname
		Object.assign(
			this, 
			member.getPropsCopy()
		);

		this.id = member.id.value;
	}

	@Field()
	id: string;

	@Field()
	firstname: string;

	@Field()
	lastname: string;

}
