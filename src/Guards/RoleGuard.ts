import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { MovieService } from "../Services/MovieService/MovieService";
import { UserRole } from "../Services/AuthorizationService/contracts/User";

//TODO: not the best way to check ability to create a movie; Find better solution;
@Injectable()
export class RoleGuard implements CanActivate {
    constructor (
       private readonly movieService: MovieService
    ) {}

    public async canActivate (
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { user } = request;

        if (user.role === UserRole.PREMIUM) {
            return true;
        }

        const count = await this.movieService.countUserMoviesPerMonth(request.user.id);

        if (count >= 5) {
            throw new HttpException(
                "Not premium user can't create more than 5 movies per month",
                HttpStatus.METHOD_NOT_ALLOWED
            );
        }

        return true;
    }
}
