import AccountService from "@module/account/domain/account.service";
import { JwtAuthService } from "@module/authentication/jwt/jwt-auth.service";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { OAuth2Client } from "google-auth-library";

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

	async exchangeToken(token: string): Promise<{ accessToken: string }> {
		// Verify the token
		const ticket = await this.oauthClient.verifyIdToken({
			idToken: token,
			audience: this.configService.get<string>('GOOGLE_CLIENT_ID'),
		})

		// Extract the sub (google id) from the payload
		const { sub } = ticket.getPayload();

		// Get the account
		const account = await this.accountService.findAccountByProvider('google', sub);

		// Create a token for this account
		// this.jwtAuthService
		return this.jwtAuthService.login(account);
	}

}
