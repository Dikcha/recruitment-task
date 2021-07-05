import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { AUTH_TYPE } from "./AuthType";
import { UserRole } from "../Services/AuthorizationService/contracts/User";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, AUTH_TYPE.JWT) {
    constructor (secret: string) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: secret,
            ignoreExpiration: false
        });
    }

    public validate (payload: any): { id: number; username: string; role: UserRole; } {
        return { id: payload.sub, username: payload.name, role: payload.role };
    }
}
