import { AggregateRoot } from '@base/module/aggregate-root.base';
import { UUID } from "@base/module/value-objects/uuid.value-object"; 

import { Member } from '@module/members/domain/entities/member.entity';

export type GroupProps = {
	members: Member[];
}

export type NewGroupProps = GroupProps;

export class Group extends AggregateRoot<GroupProps> {
	protected _id: UUID;

	public static create(props: NewGroupProps): Group {
		return new Group({ id: UUID.generate(), props });
	}
}
