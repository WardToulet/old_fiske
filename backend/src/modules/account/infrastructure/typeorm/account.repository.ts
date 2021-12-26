import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { QueryParams } from "@base/module/ports/repository.port.base";
import { TypeormRepository, WhereCondition } from "@base/typeorm";

import { Option, Some, None } from "@utils/option";

import { Account, AccountProps } from "@module/account/domain/entities/account.entity";
import { AccountRepositoryPort } from "@module/account/domain/ports/account.repository.port";

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

	async findOneByProvider(provider: string, providerId: string): Promise<Option<Account>> {
		 return this.repository
		 	.findOne({
				where: {
					provider,
					providerId,
				}	,
				relations: this.relations,
			})
			.then(this.mapper.toDomainEntity)
  		.then(value => new Some(value))
			.catch(_ => new None())
	}
}

