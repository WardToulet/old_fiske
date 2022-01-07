import { Resolver, Query, Mutation, Args, ID }  from '@nestjs/graphql';

import { UUID } from '@base/module/value-objects/uuid.value-object';

import { FamilyService } from '../../domain/family.service';
import { FamilyDTO } from './dtos/family.dto';

@Resolver(_of => FamilyDTO)
export class FamilyResolver {
	constructor(
		private familyService: FamilyService
	) {}

	@Query(_returns => [FamilyDTO])
	// @UseGuards(GqlAuthGuard)
	async families(): Promise<FamilyDTO[]> {
		return this.familyService.findAll()
			.then(accountsOpt => accountsOpt  
					.map(accounts => accounts.map(family => new FamilyDTO(family)))
					.unwrapOr([])
			);

	}

	@Mutation(_returns => FamilyDTO)
	async createFamily(
		// @Args('members', { type: () => ID, nullable: true }) members?: string[],
		// @Args('accounts', { type: () => ID, nullable: true }) accounts?: string[],
	): Promise<FamilyDTO> {
		return this.familyService.createFamily()
			.then(familyRes => familyRes 
				.map(family => new FamilyDTO(family))
				.unwrap()
			);
	}

	@Mutation(_returns => FamilyDTO)
	async deleteFamily(@Args('id', { type: () => ID}) id: string) {
		const uuid = UUID.fromString(id);

		return this.familyService.deleteFamily(uuid);
	}

	@Mutation(_returns => FamilyDTO)
	async addMember(
		@Args('familyId', { type: () => ID }) familyId: string,
		@Args('memberId', { type: () => ID }) memberId: string,
	): Promise<FamilyDTO> {
			const familyUUID = UUID.fromString(familyId);
			const memberUUID = UUID.fromString(memberId);

			return this.familyService.addMember(familyUUID, memberUUID)
				.then(familyRes => familyRes 
						.map(family =>	new FamilyDTO(family))
						.unwrap()
				);
	}
}
