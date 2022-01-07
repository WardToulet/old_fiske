import { Account } from "@module/account/domain/entities/account.entity";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

export type AuthenticatedDTO = {
	accessToken: string,
	refreshToken: string,
} 

@Injectable()
export class JwtAuthService {
	constructor(
		private readonly jwtService: JwtService
	) {}

	/**
	 * Create a jwt for an account
	 **/
	authenticate(account: Account): AuthenticatedDTO {
		const accessTokenPayload = {
			// username: account.getPropsCopy().email.value,
			sub: account.id.value,
		};

		const refreshTokenPayload = {
			
		};

		return {
			accessToken: this.jwtService.sign(accessTokenPayload),
			refreshToken: this.jwtService.sign(refreshTokenPayload, { expiresIn: '24h' }),
		};
	}
}
