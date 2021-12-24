import { QueryParams } from "@base/module";
import { TypeormRepository, WhereCondition } from "@base/typeorm";
import { Account, AccountProps } from "@module/account/domain/entities/account.entity";
import { AccountRepositoryPort } from "@module/account/domain/ports/account.repository.port";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AccountMapper } from "./account.mapper";
import { TypeormAccount } from "./account.typeorm.entity";

@Injectable()
export class AccountRepository
	extends TypeormRepository<Account, AccountProps, TypeormAccount>
	implements AccountRepositoryPort 
{
	constructor(
		@InjectRepository(TypeormAccount)
		accountRepository: Repository<TypeormAccount>,
	) {
		super(
			accountRepository,	
			new AccountMapper()
		)
	}

	readonly relations: string[] = [];

	protected prepareQuery(
		params:  QueryParams<AccountProps>
	): WhereCondition<TypeormAccount> {
		const where: QueryParams<TypeormAccount> = {};

		if(params.id) where.id = params.id.value;
		if(params.createdAt) where.createdAt = params.createdAt.value;

		return where;
	}

	async findOneByProvider(provider: string, providerId: string): Promise<Account | undefined> {
		const found = await this.repository.findOne({
			where: {
				provider,
				providerId,
			},
			relations: this.relations,
		});
		
		// Return mapped if found otherwise return undefind
		return found && this.mapper.toDomainEntity(found);
	}
}

