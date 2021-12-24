import { UUID } from "@base/module";
import { Email } from "@base/module/value-objects/email.value-object";
import { EntityProps, OrmEnitytProps, OrmMapper } from "@base/typeorm";
import { Account, AccountProps } from "@module/account/domain/entities/account.entity";
import { Provider } from "@module/account/domain/value-objects/provider.value-object";
import { TypeormAccount } from "./account.typeorm.entity";

export class AccountMapper extends OrmMapper<Account, TypeormAccount> {
	constructor() {
		super(Account, TypeormAccount);
	}

    protected toDomainProps(ormEntity: TypeormAccount): EntityProps<unknown> {
	    const id = new UUID(ormEntity.id); 
	    const props: AccountProps = {
		email: new Email(ormEntity.email),
		provider: new Provider({
			provider: ormEntity.provider,
			providerId: ormEntity.providerId,
		})
	    }

	    return { id, props };
    }

    protected toOrmProps(domainEntity: Account): OrmEnitytProps<TypeormAccount> {
	    const props = domainEntity.getPropsCopy();


	    return {
		email: props.email.value,	
		provider: props.provider.provider,
		providerId: props.provider.providerId,
	    }
    }
}
