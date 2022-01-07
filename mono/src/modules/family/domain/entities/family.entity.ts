import { AggregateRoot } from '@base/module/aggregate-root.base';
import { UUID } from "@base/module/value-objects/uuid.value-object"; 

import { Account } from '@module/account/domain/entities/account.entity';
import { Member } from '@module/member/domain/entities/member.entity';

export type FamilyProps = {
	members: Member[];
	accounts: Account[];
}

export type NewFamilyProps = FamilyProps;

export class Family extends AggregateRoot<FamilyProps> {
	protected _id: UUID;

	public static create(props: NewFamilyProps): Family {
		return new Family({ id: UUID.generate(), props });
	}
}
