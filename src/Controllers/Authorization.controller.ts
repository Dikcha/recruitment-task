import { Body, Controller, Post, UseGuards, Req, HttpStatus, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AuthPayload } from "./models/AuthPayload";
import { LocalAuthGuard } from "../Guards/LocalAuthGuard";
import { AuthorizationService } from "../Services/AuthorizationService/AuthorizationService";

@Controller()
@UsePipes(new ValidationPipe({ whitelist: true }))
@ApiTags("Authorization")
@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Not authorized" })
export class AuthorizationController {
    constructor (
        private readonly authorizationService: AuthorizationService
    ) {}

    @Post("/auth")
    @UseGuards(LocalAuthGuard)
    @ApiOperation({ description: "Authorize and get jwt." })
    @ApiResponse({ status: HttpStatus.CREATED, type: String, description: "Credentials are correct" })
    public auth (
        @Body() _payload: AuthPayload,
        @Req() request: any
    ): { token: string; } {
        return { token: this.authorizationService.createToken(request.user) };
    }
}
