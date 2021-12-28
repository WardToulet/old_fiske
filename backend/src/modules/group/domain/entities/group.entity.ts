import { AggregateRoot } from '@base/module/aggregate-root.base';
import { UUID } from "@base/module/value-objects/uuid.value-object"; 

import { Member } from '@module/members/domain/entities/member.entity';
import { PrivilegedAccount } from '../value-objects/privileged-account.value-object';

export type GroupProps = {
	members: Promise<Member[]>;
	privilegedAccounts: Promise<PrivilegedAccount[]>,
}

export type NewGroupProps = {
	members: Member[];
	privilegedAccounts: PrivilegedAccount[],
};


export class Group extends AggregateRoot<GroupProps> {
	protected _id: UUID;

	public static create({ privilegedAccounts, members }: NewGroupProps): Group {
		return new Group({ 
			id: UUID.generate(), 
			props: {
				privilegedAccounts: Promise.resolve(privilegedAccounts),
				members: Promise.resolve(members),
			}
		});
	}
}
