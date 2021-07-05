import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AUTH_TYPE } from "../Strategies/AuthType";

@Injectable()
export class LocalAuthGuard extends AuthGuard(AUTH_TYPE.LOCAL) {}
