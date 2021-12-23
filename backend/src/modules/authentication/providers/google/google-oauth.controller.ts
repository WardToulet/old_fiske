import { Body, Controller, Get, Post, Req, UseGuards, HttpException, HttpStatus } from "@nestjs/common";
import { IsNotEmpty, IsString } from "class-validator";
import { Request } from "express";
import { JwtAuthService } from "../../jwt/jwt-auth.service";
import { GoogleOAuthGuard } from "./google-oauth.guard";
import { GoogleOAuthService } from "./google-oauth.service";

export class ExchangeGoogleTokenDTO {
	@IsString()
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
		return this.jwtAuthService.authenticate(req.user);
	}

	@Post('exchange')
	async exchangeGoogleOAuthToken(@Body() { token }: ExchangeGoogleTokenDTO) {
		try {
		return await this.googleOAuthService.authenticate(token);
		} catch(e) {
			console.error(e);	
			throw new HttpException({
				kind: 'noLinkedAccount',
			}, HttpStatus.FORBIDDEN)
		}
	}
}
