import { Field, ObjectType } from '@nestjs/graphql';

import { AccountDTO } from '@module/account/infrastructure/graphql/dtos/account.dto';
import { PrivilegedAccount } from '@module/group/domain/value-objects/privileged-account.value-object';

@ObjectType('PrivilegedAccount')
export class PrivilegedAccountDTO extends AccountDTO{
	constructor(privilegedAccount: PrivilegedAccount) {
		super(privilegedAccount.account);
		this.privilegeLevel = privilegedAccount.privilegeLevel;
	}

	@Field(_type => String, { nullable: false })
	privilegeLevel: string;
}
