import { MemberModule } from "@module/member/member.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { GroupService } from "./domain/group.service";
import { GroupResolver } from "./infrastructure/graphql/group.resolver";
import { GroupRepository } from "./infrastructure/typeorm/group.repository";
import { TypeormGroup } from "./infrastructure/typeorm/group.typeorm.entity";
import { TypeormPrivilgedAccount } from "./infrastructure/typeorm/privileged-account.typeorm.entity";

@Module({
	imports: [
		MemberModule,
		TypeOrmModule.forFeature([
			TypeormGroup,
			TypeormPrivilgedAccount,
		]),
	],
	providers: [
		GroupRepository,
		GroupService,
		GroupResolver,
	],
})
export class GroupModule {};
