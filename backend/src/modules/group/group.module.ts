import { MembersModule } from "@module/members";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { GroupService } from "./domain/group.service";
import { GroupResolver } from "./infrastructure/graphql/group.resolver";
import { GroupRepository } from "./infrastructure/typeorm/group.repository";
import { TypeormGroup } from "./infrastructure/typeorm/group.typeorm.entity";

@Module({
	imports: [
		MembersModule,
		TypeOrmModule.forFeature([
			TypeormGroup,
		]),
	],
	providers: [
		GroupRepository,
		GroupService,
		GroupResolver,
	],
})
export class GroupModule {};