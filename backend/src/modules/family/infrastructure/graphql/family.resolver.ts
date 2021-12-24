import { FamilyService } from "@module/family/domain/family.service";
import { Resolver, Query } from "@nestjs/graphql";
import { FamilyDTO } from "./dtos/family.dto";

// TODO: add a for type
@Resolver()
export class FamilyResolver {
		constructor(
			private readonly familyService: FamilyService,
		) {}

		@Query(_returuns => [FamilyDTO])
		async families() {
			return this.familyService.getFamilies()
				.then(families => families.map(family => new FamilyDTO(family)));
		}
}
