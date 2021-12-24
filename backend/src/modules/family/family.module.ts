import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { FamilyService } from "./domain/family.service";
import { FamilyResolver } from "./infrastructure/graphql/family.resolver";
import { FamilyRepository } from "./infrastructure/typeorm/family.repository";
import { TypeormFamily } from "./infrastructure/typeorm/family.typeorm.entity";

@Module({
	imports: [
		TypeOrmModule.forFeature([
			TypeormFamily,
		]),	
	],
	providers:[
		FamilyRepository,
		FamilyService,
		FamilyResolver,
	],
})
export class FamilyModule {};
