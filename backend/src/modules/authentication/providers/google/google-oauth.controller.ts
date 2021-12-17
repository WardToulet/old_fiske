import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { IsNotEmpty } from "class-validator";
import { Request } from "express";
import { JwtAuthService } from "../../jwt/jwt-auth.service";
import { GoogleOAuthGuard } from "./google-oauth.guard";
import { GoogleOAuthService } from "./google-oauth.service";

export class ExchangeGoogleTokenDTO {
	@IsNotEmpty()
	token: string
};

@Controller('auth/google')
export class GoogleOAuthController {
	constructor(
		private readonly jwtAuthService: JwtAuthService,
		private readonly googleOAuthService: GoogleOAuthService,
	) {}

	/**
	 * Redirects to google login page
	 **/
	@Get('login')
	@UseGuards(GoogleOAuthGuard)
	async googleAuth(@Req() _req: Request) {}

	/**
	 * Gets called by the authenticaion service, then returns an access token
	 **/
	@Get('redirect')
	@UseGuards(GoogleOAuthGuard)
	async googleAuthRedirect(@Req() req: Request) {
		return this.jwtAuthService.login(req.user);
	}

	@Post('exchange')
	async exchangeGoogleOAuthToken(@Body() { token }: ExchangeGoogleTokenDTO) {
		return await this.googleOAuthService.exchangeToken(token);
	}
}
