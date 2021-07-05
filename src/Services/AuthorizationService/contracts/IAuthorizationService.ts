import { User } from "./User";
import { UserInfoToCreateToken } from "./UserInfoToCreateToken";

export interface IAuthorizationService {
    validateUser (username: string, password: string): User;
    createToken (user: UserInfoToCreateToken): string;
}
