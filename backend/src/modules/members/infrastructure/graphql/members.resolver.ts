import { Query, Resolver } from "@nestjs/graphql";
import { MembersService } from "../../domain/members.service";
import { MemberDTO } from "./dtos/member.dto"

@Resolver(_of => MemberDTO)
export class MembersResolver {
	constructor(
		private membersService: MembersService
	) {}

	@Query(_returns => [MemberDTO])
	async members(): Promise<MemberDTO[]> {
		// FIXME: dthis retturns domain objects
		return (await this.membersService.findAll()).map(member => new MemberDTO(member));
	}
}
