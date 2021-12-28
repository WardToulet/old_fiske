import { UUID } from "@base/module/value-objects/uuid.value-object";
import { EntityProps, OrmEnitytProps, OrmMapper } from "@base/typeorm";

import { AccountMapper } from "@module/account/infrastructure/typeorm/account.mapper";
import { MemberMapper } from "@module/member/infrastructure/typeorm/member.mapper";

import { Family, FamilyProps } from "../../domain/entities/family.entity";
import { TypeormFamily } from "./family.typeorm.entity";

export class FamilyMapper extends OrmMapper<Family, TypeormFamily> {
	private readonly memberMapper  = new MemberMapper();
	private readonly accountMapper = new AccountMapper();

	constructor() {
		super(Family, TypeormFamily);
	}

	protected toDomainProps(ormEntity: TypeormFamily): EntityProps<unknown> {
		const id = new UUID(ormEntity.id); 
		const props: FamilyProps = {
			members: ormEntity.members?.map(this.memberMapper.toDomainEntity.bind(this.memberMapper)),
			accounts: ormEntity.accounts?.map(this.accountMapper.toDomainEntity.bind(this.accountMapper)),
		};

		return { id, props };
	}

	protected toOrmProps(domainEntity: Family): OrmEnitytProps<TypeormFamily> {
		const props = domainEntity.getPropsCopy();

		// console.log(props.members.map(member => member.getPropsCopy().firstname));

		return {
			accounts: [],
			// accounts: props.accounts.map(this.accountMapper.toOrmEntity.bind(this)),
			members: props.members?.map(this.memberMapper.toOrmEntity.bind(this.memberMapper)),
			// members: [],
		}
	}
}
