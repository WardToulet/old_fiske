import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { JwtAuthService } from "../../jwt/jwt-auth.service";
import { GoogleOAuthGuard } from "./google-oauth.guard";

@Controller('auth/google')
export class GoogleOAuthController {
	constructor(
		private readonly jwtAuthService: JwtAuthService
	) {}

	/**
	 * Redirects to google login page
	 **/
	@Get()
	@UseGuards(GoogleOAuthGuard)
	async googleAuth(@Req() _req: Request) {}

	/**
	 * Gets called by the authenticaion service, then returns an access token
	 **/
	@Get('redirect')
	@UseGuards(GoogleOAuthGuard)
	async googleAuthRedirect(@Req() req: Request) {
		const { accessToken } = this.jwtAuthService.login(req.user);
		return { accessToken };
	}
}
