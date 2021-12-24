import { Injectable } from "@nestjs/common";

import { UUID } from "@base/module";
import { Account } from "@module/account/domain/entities/account.entity";
import { Member } from "@module/members/domain/entities/member.entity";

import { Family } from "./entities/family.entity";
import { FamilyRepository } from "../infrastructure/typeorm/family.repository";

@Injectable()
export class FamilyService {
	constructor(
		// FIXME: this should realy use the port instead of the inpmpelentation
		// this beraks the injection
		private readonly familyRepository: FamilyRepository,
	) {
			// TEMP: remove this
			familyRepository.save(Family.create({
				members: [],
				accounts: [],
			}))
			.then(console.log)
			.catch(console.error)
	}

	/**
	 * Create a new family
	 **/
	async createFamily(): Promise<Family> {
		throw 'unimplemented'
	}

	async getFamilyById(id: UUID): Promise<Family | undefined> {
		throw 'unimplemented'
	}

	async getFamilies(): Promise<Family[]> {
		return this.familyRepository.find();
	}

	/**
	 * Add a member (child) to a family
	 **/
	async addMember(family:  Family, member: Member): Promise<Family | undefined> {
		throw 'unimplemented'
	}

	/**
	 * Remove a member (child) from a family
	 */
	async removeMember(family: Family, member: Member): Promise<Family | undefined> {
		throw 'unimplemented'
	}

	/**
	 * Add an account (parent) to a family 
	 */
	async addAccount(family: Family, account: Account): Promise<Family | undefined> {
		throw 'unimplemented'
	}
}
