import { UUID } from "@base/module";
import { EntityProps, OrmEnitytProps, OrmMapper } from "@base/typeorm";

import { AccountMapper } from "@module/account/infrastructure/typeorm/account.mapper";
import { MemberMapper } from "@module/members/infrastructure/typeorm/member.mapper";

import { Family, FamilyProps } from "../../domain/entities/family.entity";
import { TypeormFamily } from "./family.typeorm.entity";

export class FamilyMapper extends OrmMapper<Family, TypeormFamily> {

	// Initial mapper depenencies
	private readonly memberMapper: MemberMapper = new MemberMapper();
	private readonly accountMapper: AccountMapper = new AccountMapper();

	constructor() {
		super(Family, TypeormFamily);
	}

  protected toDomainProps(ormEntity: TypeormFamily): EntityProps<unknown> {
		const id = new UUID(ormEntity.id);
	  const props: FamilyProps = {
			members: ormEntity.members?.map(this.memberMapper.toDomainEntity),
			accounts: ormEntity.accounts?.map(this.accountMapper.toDomainEntity),
	  }

	  return { id, props };
  }

  protected toOrmProps(domainEntity: Family): OrmEnitytProps<TypeormFamily> {
	  const props = domainEntity.getPropsCopy();

	  return {
			members: props.members?.map(this.memberMapper.toOrmEntity),
			accounts: props.accounts?.map(this.accountMapper.toOrmEntity),
	  }
  }
}
