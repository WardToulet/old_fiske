import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { MembersService } from '../../domain/members.service';
import { CreateMemberDTO } from './dtos/create-member.dto';
import { MemberDTO } from './dtos/member.dto';
import { UpdateMemberDTO } from './dtos/update-member.dto';

@Resolver(_of => MemberDTO)
export class MembersResolver {
	constructor(
		private membersService: MembersService
	) {}

	@Query(_returns => [MemberDTO])
	async members(): Promise<MemberDTO[]> {
		// FIXME: dthis retturns domain objects
		// return (await this.membersService.findAll()).map(member => new MemberDTO(member));
		return this.membersService.findAll()
			.then(members => members.map(member => new MemberDTO(member)));
	}

	@Mutation(_returns => MemberDTO)
	async newMember(@Args('props') props: CreateMemberDTO): Promise<MemberDTO> {
		return this.membersService.create(props)
			.then(member => new MemberDTO(member));
	}

	@Mutation(_returns => MemberDTO)
	async deleteMember(@Args('id') uuid: string): Promise<MemberDTO> {
		return this.membersService.delete(uuid)
			.then(member => new MemberDTO(member));
	}

	@Mutation(_returns => MemberDTO)
	async updateMember(@Args('id') uuid: string, @Args('props') props: UpdateMemberDTO) {
		return this.membersService.update(uuid, props)
			.then(member => new MemberDTO(member));
	}
}

