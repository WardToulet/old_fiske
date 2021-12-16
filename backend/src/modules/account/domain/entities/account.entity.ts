import { AggregateRoot, UUID } from '@base/module';
import { Email } from '@base/module/value-objects/email.value-object';
import { Provider } from '../value-objects/provider.value-object';

export type AccountProps = {
	email: Email,

	provider: Provider,
}

export type NewAccountProps = AccountProps;

export class Account extends AggregateRoot<AccountProps> {
    protected _id: UUID;
}
