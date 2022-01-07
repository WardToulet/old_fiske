import AccountService from '@module/account/domain/account.service';
// import { GqlAuthGuard } from '@module/authentication/jwt/gql-auth.guard';
// import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { AccountDTO } from './dtos/account.dto';

@Resolver(_of => AccountDTO)
export class AccountResolver {
	constructor(
		private accountsService: AccountService
	) {}

	@Query(_returns => [AccountDTO])
	// @UseGuards(GqlAuthGuard)
	async accounts(): Promise<AccountDTO[]> {
		return this.accountsService
			.findAll()
			.then(accountOpt =>
				accountOpt
					.map(accounts => accounts.map(account => new AccountDTO(account)))
					.unwrapOr([])
			);
	}
}
