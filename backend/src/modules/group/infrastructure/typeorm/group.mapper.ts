import { UUID } from "@base/module/value-objects/uuid.value-object";
import { EntityProps, OrmEnitytProps, OrmMapper } from "@base/typeorm";

import { AccountMapper } from "@module/account/infrastructure/typeorm/account.mapper";
import { PrivilegedAccount, PrivilegeLevel } from "@module/group/domain/value-objects/privileged-account.value-object";
import { MemberMapper } from "@module/member/infrastructure/typeorm/member.mapper";

import { Group, GroupProps } from "../../domain/entities/group.entity";
import { TypeormGroup } from "./group.typeorm.entity";
import { TypeormPrivilgedAccount } from "./privileged-account.typeorm.entity";

export class GroupMapper extends OrmMapper<Group, TypeormGroup> {
	private readonly memberMapper  = new MemberMapper();
	private readonly accountMapper  = new AccountMapper();

	constructor() {
		super(Group, TypeormGroup);
	}

	protected toDomainProps(ormEntity: TypeormGroup): EntityProps<unknown> {
		const id = new UUID(ormEntity.id); 

		const props: GroupProps = {
			members: ormEntity.members.then(typeormMembers => 
					typeormMembers.map(this.memberMapper.toDomainEntity.bind(this.memberMapper))
			),
			privilegedAccounts: ormEntity.privilegedAccounts.then(privilegedAccounts => 
				privilegedAccounts.map(({ account, privilegeLevel }) => {
					return new PrivilegedAccount(
						this.accountMapper.toDomainEntity(account),
						privilegeLevel as PrivilegeLevel
					)
				}),
			),
		};

		return { id, props };
	}

	protected toOrmProps(domainEntity: Group): OrmEnitytProps<TypeormGroup> {
		const props = domainEntity.getPropsCopy();

		return {
			members: props.members.then(members =>
				members.map(this.memberMapper.toOrmEntity.bind(this.memberMapper))
			),
			privilegedAccounts: props.privilegedAccounts.then(privilegedAccounts =>
				privilegedAccounts.map(({ account, privilegeLevel }) =>
					new TypeormPrivilgedAccount({
						account: this.accountMapper.toOrmEntity(account),
						privilegeLevel,
					}),
				),
			),
		}
	}
}
