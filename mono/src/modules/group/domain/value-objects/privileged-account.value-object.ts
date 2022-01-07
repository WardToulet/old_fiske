import { ValueObject } from '@base/module/value-objects/value-object.base';
import { Account } from '@module/account/domain/entities/account.entity';

export type PrivilegeLevel =
	| 'owner'	
	| 'moderator'

export class PrivilegedAccount extends ValueObject<{
	account: Account,
	privilegeLevel: PrivilegeLevel,
}>  {
	constructor(account: Account | Account, privilegeLevel: PrivilegeLevel) {
		super({ account, privilegeLevel });
	}

	get account(): Account { return this.props.account }
	get privilegeLevel(): PrivilegeLevel { return this.props.privilegeLevel }
}
