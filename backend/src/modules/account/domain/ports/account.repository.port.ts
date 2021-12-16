import { RepositoryPort } from "@base/module";
import { Account, AccountProps } from "../entities/account.entity";

export interface AccountRepositoryPort extends RepositoryPort<Account, AccountProps> {
	findOneByProvider(provider: string, providerId: string): Promise<Account | undefined>;
}
