import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AUTH_TYPE } from "../Strategies/AuthType";

@Injectable()
export class JwtAuthGuard extends AuthGuard(AUTH_TYPE.JWT) {}
