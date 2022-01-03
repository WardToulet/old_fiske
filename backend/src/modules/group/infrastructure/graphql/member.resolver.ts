import { Resolver, Query, Mutation, Args, ID, Parent }  from '@nestjs/graphql';

import { UUID } from '@base/module/value-objects/uuid.value-object';

import { GroupService } from '../../domain/group.service';
import { GroupDTO } from './dtos/group.dto';
import { MemberDTO } from '@module/member/infrastructure/graphql/dtos/member.dto';

@Resolver(_of => MemberDTO)
export class GroupResolver {
	constructor(
		private groupService: GroupService
	) {}
}
