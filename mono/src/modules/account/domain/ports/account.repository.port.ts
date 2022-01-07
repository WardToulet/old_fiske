import { Option } from "@utils/option"
import { RepositoryPort } from "@base/module/ports/repository.port.base";

import { Account, AccountProps } from "../entities/account.entity";

export interface AccountRepositoryPort extends RepositoryPort<Account, AccountProps> {
	findOneByProvider(provider: string, providerId: string): Promise<Option<Account>>;
}
