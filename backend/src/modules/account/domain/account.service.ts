import { Email } from '@base/module/value-objects/email.value-object';
import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../infrastructure/typeorm/account.repository';
import { Account, NewAccountProps } from './entities/account.entity';

@Injectable()
export default class AccountService {
	constructor(
		private readonly accountRepository: AccountRepository,
	) {}

	async findAccount(email: string): Promise<Account| undefined> {
		return this.accountRepository.findOne({ email: new Email(email) });
	}

	async findAll() {
		return this.accountRepository.find();
	}

	async findAccountByProvider(provider: string, providerId: string): Promise<Account | undefined> {
		return this.accountRepository.findOneByProvider(provider, providerId);
	}

	async create(props: NewAccountProps): Promise<Account> {
		const account = Account.create(props);

		return this.accountRepository.save(account)
	}

}
