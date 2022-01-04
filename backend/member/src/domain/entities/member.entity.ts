import { AggregateRoot, DateVO, UUID } from '@fiske/base-module';

import { GenderVO } from '../value-objects/gender.value-object';

export type MemberProps = {
	firstname: string;
	lastname: string;

	nickname?: string;

	birthday: DateVO,
	gender: GenderVO;
}

export type NewMemberProps = MemberProps;

export class Member extends AggregateRoot<MemberProps> {
	protected readonly _id: UUID;

	public static create(props: NewMemberProps): Member {
		const uuid = UUID.generate();
		
		return new Member({
			id: uuid,
			props
		});
	}
}
