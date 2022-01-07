import { Unique, Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';

import { TypeormAccount } from '@module/account/infrastructure/typeorm/account.typeorm.entity';
import { TypeormGroup } from './group.typeorm.entity';

@Entity('groups_accounts_privileged_account')
@Unique(['account', 'group'])
export class TypeormPrivilgedAccount {
	constructor(props: Omit<TypeormPrivilgedAccount, 'group' | 'id'>) {
		Object.assign(this, props);	
	}

  @PrimaryGeneratedColumn()
  id: number;

	@ManyToOne(_type => TypeormAccount, { eager: true })
	account: TypeormAccount;

	@ManyToOne(
		_type => TypeormGroup, 
		(group: TypeormGroup) => group.privilegedAccounts,
	)
	group: Promise<TypeormGroup>;

	@Column()
	privilegeLevel: string;
}
