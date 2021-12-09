import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MembersService } from "./domain/members.service";
import { MembersResolver } from "./infrastructure/graphql/members.resolver";
import { TypeormMember } from "./infrastructure/typeorm/member.typeorm.entity";
import { MembersRepository } from "./infrastructure/typeorm/members.repository";

@Module({
	imports: [ 
		TypeOrmModule.forFeature([ TypeormMember ]),
	],
	providers: [
		MembersService, 
		MembersResolver,
		MembersRepository,
	],
})
export class MembersModule {};
