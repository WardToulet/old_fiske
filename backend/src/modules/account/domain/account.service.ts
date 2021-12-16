import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../infrastructure/typeorm/account.repository';
import { Account, NewAccountProps } from './entities/account.entity';

@Injectable()
export default class AccountService {
	constructor(
		private readonly accountRepository: AccountRepository,
	) {}

	private readonly accounts: { email: string, password: string }[] = [
		{ email: 'caraya@thilacoloma.be', password: 'test' },
		{ email: 'ward@toulet.net', password: '12345' }
	];

	async findAccount(email: string): Promise<{ email: string, password: string} | null> {
		return this.accounts.find(account => account.email === email);
	}

	async findAll() {
		return this.accounts;
	}

	async findAccountByProvider(provider: string, providerId: string): Promise<Account | undefined> {
		return this.accountRepository.findOneByProvider(provider, providerId);
	}

	async create(props: NewAccountProps): Promise<Account> {
		const account = Account.create(props);

		return this.accountRepository.save(account)
	}

}
