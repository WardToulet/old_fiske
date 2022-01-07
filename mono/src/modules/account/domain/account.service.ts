import { Email } from '@base/module/value-objects/email.value-object';
import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../infrastructure/typeorm/account.repository';
import { Account, NewAccountProps } from './entities/account.entity';

import { Option } from "@utils/option";
import { Result } from "@utils/result";
import { SaveError } from '@base/module/ports/repository.port.base';

@Injectable()
export default class AccountService {
	constructor(
		private readonly accountRepository: AccountRepository,
	) {}

	async findAccount(email: string): Promise<Option<Account>> {
		return this.accountRepository.findOne({ email: new Email(email) });
	}

	async findAll() {
		return this.accountRepository.find();
	}

	async findAccountByProvider(provider: string, providerId: string): Promise<Option<Account>> {
		return this.accountRepository.findOneByProvider(provider, providerId);
	}

	// FIXME: the generic save error should be transated to an error specificaly for account
	async create(props: NewAccountProps): Promise<Result<Account, SaveError>> {
		const account = Account.create(props);
		return this.accountRepository.save(account);
	}

}
