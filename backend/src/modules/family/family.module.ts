import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { MemberModule } from "@module/member/member.module";

import { FamilyService } from "./domain/family.service";
import { FamilyResolver } from "./infrastructure/graphql/family.resolver";
import { FamilyRepository } from "./infrastructure/typeorm/family.repository";
import { TypeormFamily } from "./infrastructure/typeorm/family.typeorm.entity";

@Module({
	imports: [
		MemberModule,
		TypeOrmModule.forFeature([
			TypeormFamily,
		]),
	],
	providers: [
		FamilyRepository,
		FamilyService,
		FamilyResolver,
	],
})
export class FamilyModule {};
