import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { OAuth2Client } from "google-auth-library";

import { Result } from "@utils/result";

import AccountService from "@module/account/domain/account.service";
import { AuthenticatedDTO, JwtAuthService } from "@module/authentication/jwt/jwt-auth.service";

export class GoogleAuthenticationError extends Error {}

@Injectable()
export class GoogleOAuthService {
	private readonly oauthClient: OAuth2Client;

	constructor(
		private readonly configService: ConfigService,
		private readonly jwtAuthService: JwtAuthService,
		private readonly accountService: AccountService,
	) {
		this.oauthClient = new OAuth2Client(
			configService.get<string>('GOOGLE_CLIENT_ID'),
		);
	}

	async authenticate(token: string): Promise<Result<AuthenticatedDTO, GoogleAuthenticationError>> {
		// Verify the token
		const ticket = await this.oauthClient.verifyIdToken({
			idToken: token,
			audience: this.configService.get<string>('GOOGLE_CLIENT_ID'),
		})

		// Extract the sub (google id) from the payload
		const { sub } = ticket.getPayload();

		// Get the account
		return this.accountService.findAccountByProvider('google', sub)
			.then(accountOpt => accountOpt
				.map(this.jwtAuthService.authenticate)
				.okOr(new GoogleAuthenticationError())
			);
	}
}
