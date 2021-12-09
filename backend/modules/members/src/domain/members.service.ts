import { DateVO, UUID } from "@fiske/base-module";
import { Injectable } from "@nestjs/common";
import { Member } from "./entities/member.entity";

@Injectable()
export class MembersService {
	private readonly members: Member[] = [
		new Member({
			id: UUID.generate(),
			createdAt: DateVO.now(),
			updatedAt: DateVO.now(),
			props: {
				firstname: 'Ward',
				lastname: 'Toulet',
			}
		})
	];

	async findAll(): Promise<Member[]> {
		return this.members;
	}
}
