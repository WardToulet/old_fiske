import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';

import { MemberService } from '../../domain/member.service';
import { CreateMemberDTO } from './dtos/create-member.dto';
import { MemberDTO } from './dtos/member.dto';
import { UpdateMemberDTO } from './dtos/update-member.dto';

@Resolver(_of => MemberDTO)
export class MemberResolver {
	constructor(
		private membersService: MemberService
	) {}

	@Query(_returns => [MemberDTO])
	async members(): Promise<MemberDTO[]> {
		return this.membersService.findAll()
			.then(membersOpt => membersOpt
				.map(members => members.map(member => new MemberDTO(member)))
				.unwrapOr([])
			);
	}

	@Mutation(_returns => MemberDTO)
	async createMember(@Args('props') props: CreateMemberDTO): Promise<MemberDTO> {
		return this.membersService.create(props)
			.then(membersOpt => membersOpt
				.map(member => new MemberDTO(member))
				.unwrap()
			);
	}

	@Mutation(_returns => MemberDTO)
	async deleteMember(@Args('id') uuid: string): Promise<MemberDTO> {
		return this.membersService.delete(uuid)
			.then(membersOpt => membersOpt
				.map(member => new MemberDTO(member))
				.unwrap()
			);
	}

	@Mutation(_returns => MemberDTO)
	async updateMember(@Args('id') uuid: string, @Args('props') props: UpdateMemberDTO) {
		return this.membersService.update(uuid, props)
			.then(membersOpt => membersOpt
				.map(member => new MemberDTO(member))
				.unwrap()
			);
	}
}

