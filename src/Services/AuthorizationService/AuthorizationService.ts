import { IAuthorizationService } from "./contracts/IAuthorizationService";
import { User, UserRole } from "./contracts/User";
import { Inject, Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { UserInfoToCreateToken } from "./contracts/UserInfoToCreateToken";
import { CONFIGS } from "../../ioc.id";
import { Configs } from "../../Configs";

@Injectable()
export class AuthorizationService implements IAuthorizationService {

    constructor (
        @Inject(CONFIGS) private readonly configs: Configs
    ) {}
    public validateUser (username: string, password: string): User {
        const users: User[] = [
            {
                id: 123,
                role: UserRole.BASICS,
                name: "Basic Thomas",
                username: "basic-thomas",
                password: "sR-_pcoow-27-6PAwCD8",
            },
            {
                id: 434,
                role: UserRole.PREMIUM,
                name: "Premium Jim",
                username: "premium-jim",
                password: "GBLtTyq3E_UNjFnpo9m6",
            },
        ];

        return users.find(u => u.username === username && u.password === password);
    }

    public createToken (user: UserInfoToCreateToken): string {
        const token: string = jwt.sign(
            {
                userId: user.id,
                name: user.name,
                role: user.role,
            },
            this.configs.JWT_SECRET,
            {
                issuer: "https://www.netguru.com/",
                subject: `${user.id}`,
                expiresIn: 30 * 60,
            }
        );

        return token;
    }
}
