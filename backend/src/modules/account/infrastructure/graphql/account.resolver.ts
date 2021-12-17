import AccountService from '@module/account/domain/account.service';
import { GqlAuthGuard } from '@module/authentication/jwt/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { AccountDTO } from './dtos/account.dto';

@Resolver(_of => AccountDTO)
export class AccountResolver {
	constructor(
		private accountsService: AccountService
	) {}

	@Query(_returns => [AccountDTO])
	@UseGuards(GqlAuthGuard)
	async accounts(): Promise<AccountDTO[]> {
		// FIXME: dthis retturns domain objects
		// return (await this.accountsService.findAll()).map(account => new AccountDTO(account));
		return this.accountsService.findAll()
			.then(accounts => accounts.map(account => new AccountDTO(account)));
	}
}
