import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Member } from '../../../domain/entities/member.entity';

// NOTE: this is a dumplicate type, we should find some nicer way of doing this, 
export enum GraphqlGender {
	Unknown,
	Female,
	Male,
}
registerEnumType(GraphqlGender, { name: 'Gender' });

@ObjectType('Member')
export class MemberDTO {
	constructor(member: Member) {
		const { gender, birthday, ...props } = member.getPropsCopy();

		// Set first- and lastname
		Object.assign(
			this, 
			{
				birthday: birthday.value,
				gender: gender.value as GraphqlGender,
				...props
			},
		);

		this.id = member.id.value;
	}

	@Field()
	id: string;

	@Field()
	firstname: string;

	@Field()
	lastname: string;

	@Field({ nullable: true })
	nickname?: string;

	@Field()
	birthday: Date;

	@Field(_type => GraphqlGender)
	gender: GraphqlGender;
}
