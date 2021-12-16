import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AccountService from './domain/account.service';
import { AccountResolver } from './infrastructure/graphql/account.resolver';
import { AccountRepository } from './infrastructure/typeorm/account.repository';
import { TypeormAccount } from './infrastructure/typeorm/account.typeorm.entity';

@Module({
	imports: [ 
		TypeOrmModule.forFeature([ TypeormAccount ]),
	],
	providers: [ AccountService, AccountResolver, AccountRepository ],
	exports: [ AccountService ],
})
export class AccountModule {}
