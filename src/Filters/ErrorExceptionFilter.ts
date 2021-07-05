import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from "@nestjs/common";
import { HttpException } from "@nestjs/common";

type CommonException = Error | HttpException | { status: number; message: string; };

@Catch()
export class ErrorExceptionFilter implements ExceptionFilter {
    public catch (exception: CommonException, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const status = this.getStatus(exception);

        response.status(status);
        response.json({
            statusCode: status,
            message: exception.message
        });
    }

    private getStatus (exception: CommonException) {
        if (exception instanceof HttpException) {
            return exception.getStatus();
        }
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
}
