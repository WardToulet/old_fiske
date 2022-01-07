import { Email } from "@base/module/value-objects/email.value-object";
import AccountService from "@module/account/domain/account.service";
import { Account } from "@module/account/domain/entities/account.entity";
import { Provider } from "@module/account/domain/value-objects/provider.value-object";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";

@Injectable()
export class GoogleOAuthStrategy extends PassportStrategy(Strategy, 'google') {
	constructor(
		configService: ConfigService,
		private readonly accountService: AccountService,
	) {
		super({
			clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
			clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
			callbackURL: `${configService.get<string>('DOMAIN')}/auth/google/redirect`,
		});
	}

	// FIXME: this should be able to error
	async validate(_accessToken: string, _refreshToken: string, profile: Profile): Promise<Account>{
		const { id, emails } = profile;

		const account = await this.accountService.findAccountByProvider('google', id);

		if(account.isSome()) {
			return account.unwrap();
		} else {
			return (await this.accountService.create({
				email: new Email(emails[0].value),
				provider: new Provider({
					provider: 'google',
					providerId: id,
				})
			}))
			.unwrap();
		}
	}
}
