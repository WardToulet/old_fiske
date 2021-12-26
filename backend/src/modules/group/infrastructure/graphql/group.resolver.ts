import { Resolver, Query, Mutation, Args, ID }  from '@nestjs/graphql';

import { UUID } from '@base/module/value-objects/uuid.value-object';

import { GroupService } from '../../domain/group.service';
import { GroupDTO } from './dtos/group.dto';

@Resolver(_of => GroupDTO)
export class GroupResolver {
	constructor(
		private groupService: GroupService
	) {}

	@Query(_returns => [GroupDTO])
	// @UseGuards(GqlAuthGuard)
	async groups(): Promise<GroupDTO[]> {
		return this.groupService.findAll()
			.then(accountsOpt => accountsOpt  
					.map(accounts => accounts.map(group => new GroupDTO(group)))
					.unwrapOr([])
			);

	}

	@Mutation(_returns => GroupDTO)
	async createGroup(
		// @Args('members', { type: () => ID, nullable: true }) members?: string[],
		// @Args('accounts', { type: () => ID, nullable: true }) accounts?: string[],
	): Promise<GroupDTO> {
		return this.groupService.createGroup()
			.then(groupRes => groupRes 
				.map(group => new GroupDTO(group))
				.unwrap()
			);
	}

	@Mutation(_returns => GroupDTO)
	async deleteGroup(@Args('id', { type: () => ID}) id: string) {
		const uuid = UUID.fromString(id);

		return this.groupService.deleteGroup(uuid);
	}

	@Mutation(_returns => GroupDTO)
	async addMember(
		@Args('groupId', { type: () => ID }) groupId: string,
		@Args('memberId', { type: () => ID }) memberId: string,
	): Promise<GroupDTO> {
			const groupUUID = UUID.fromString(groupId);
			const memberUUID = UUID.fromString(memberId);

			return this.groupService.addMember(groupUUID, memberUUID)
				.then(groupRes => groupRes 
						.map(group =>	new GroupDTO(group))
						.unwrap()
				);
	}
}
