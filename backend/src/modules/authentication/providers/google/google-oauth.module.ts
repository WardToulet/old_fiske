import { AccountModule } from "@module/account/account.module";
import { JwtAuthModule } from "@module/authentication/jwt/jwt-auth.module";
import { Module } from "@nestjs/common";
import { GoogleOAuthController } from "./google-oauth.controller";
import { GoogleOAuthStrategy } from "./google-oauth.strategy";

@Module({
	imports: [ AccountModule, JwtAuthModule ],
	controllers: [ GoogleOAuthController ],
	providers: [  GoogleOAuthStrategy ],
})
export class GoogleOAuthModule {}
