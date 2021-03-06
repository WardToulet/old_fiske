import { AggregateRoot, UUID } from '@base/module';

export type MemberProps = {
	firstname: string;
	lastname: string;
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
