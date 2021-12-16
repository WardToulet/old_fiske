import { AccountModule } from "@module/account/account.module";
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtAuthModule } from "./jwt/jwt-auth.module";
import { GoogleOAuthModule } from "./providers/google/google-oauth.module";

@Module({
	imports: [
		AccountModule,

		PassportModule,

		JwtAuthModule,
		GoogleOAuthModule,
	],
})
export class AuthenticationModule {}
