import { Query, Resolver, Mutation, Args, ID } from '@nestjs/graphql';

import { DateVO, UUID } from '@base/module/value-objects';

import { MemberProps } from '@module/member/domain/entities/member.entity';

import { MemberService } from '../../domain/member.service';
import { MemberDTO } from './dtos/member.dto';
import { CreateMemberDTO } from './dtos/create-member.dto';
import { UpdateMemberDTO } from './dtos/update-member.dto';
import { GenderVO } from '@module/member/domain/value-objects/gender.value-object';

@Resolver(_of => MemberDTO)
export class MemberResolver {
	constructor(
		private memberService: MemberService
	) {}

	@Query(_returns => [MemberDTO])
	async members(): Promise<MemberDTO[]> {
		return this.memberService.findAll()
			.then(membersOpt => membersOpt
				.map(members => members.map(member => new MemberDTO(member)))
				.unwrapOr([])
			);
	}

	@Query(_returns => MemberDTO)
	async member(@Args('id', { type: () => ID}) id: string): Promise<MemberDTO> {
		const uuid = UUID.fromString(id);
		return this.memberService.findById(uuid)
			.then(membersOpt => membersOpt
				.map(member => new MemberDTO(member))
				.unwrap()
			);
	}

	@Mutation(_returns => MemberDTO)
	async createMember(@Args('member') { birthday, gender, ...props}: CreateMemberDTO): Promise<MemberDTO> {
		const member: MemberProps = {
			birthday: new DateVO(birthday),
			gender: new GenderVO(gender),
			...props,
		}

		return this.memberService.create(member)
			.then(membersOpt => membersOpt
				.map(member => new MemberDTO(member))
				.unwrap()
			);
	}

	@Mutation(_returns => MemberDTO)
	async deleteMember(@Args('id', { type: () => ID}) id: string): Promise<MemberDTO> {
		const uuid = new UUID(id);
		return this.memberService.delete(uuid)
			.then(membersOpt => membersOpt
				.map(member => new MemberDTO(member))
				.mapErr(_ => new Error(`Tried to delete non exiting user with id ${id}`))
				.map(e => { console.log(e); return e })
				.unwrap()
			);
	}

	@Mutation(_returns => MemberDTO)
	async updateMember(
		@Args('member') { id, birthday, gender, ...props }: UpdateMemberDTO
	): Promise<MemberDTO> {
		let update = {
			id: new UUID(id),
			birthday: birthday ? new DateVO(birthday) : undefined,
			gender: gender ? new GenderVO(gender) : undefined,
			...props,
		};

		return this.memberService.update(update)
			.then(membersOpt => membersOpt
				.map(member => new MemberDTO(member))
				.unwrap()
			);
	}
}
