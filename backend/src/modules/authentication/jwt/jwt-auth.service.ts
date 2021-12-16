import { Account } from "@module/account/domain/entities/account.entity";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthService {
	constructor(
		private readonly jwtService: JwtService
	) {}

	/**
	 * Create a jwt for an account
	 **/
	login(account: Account): { accessToken: string } {
		const payload = {
			username: account.getPropsCopy().email.value,
			sub: account.id.value,
		}

		return {
			accessToken: this.jwtService.sign(payload)
		}
	}
}
