import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AUTH_TYPE } from "./AuthType";
import { AuthorizationService } from "../Services/AuthorizationService/AuthorizationService";
import { UserInfoToCreateToken } from "../Services/AuthorizationService/contracts/UserInfoToCreateToken";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, AUTH_TYPE.LOCAL) {
    constructor (
        private readonly authorizationService: AuthorizationService
    ) {
        super();
    }

    public validate (username: string, password: string): UserInfoToCreateToken {
        const user = this.authorizationService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException();
        }

        const userInfo = {
            id: user.id,
            name: user.name,
            role: user.role
        };

        return userInfo;
    }
}
