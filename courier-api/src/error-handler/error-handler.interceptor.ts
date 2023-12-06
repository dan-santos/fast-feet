import { 
  BadRequestException,
  CallHandler, 
  ExecutionContext, 
  Injectable, 
  InternalServerErrorException, 
  NestInterceptor 
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { CustomError } from 'src/core/errors/custom-errors';

@Injectable()
export class ErrorHandlerInterceptor implements NestInterceptor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError((err: Error) => {
          if (err instanceof CustomError) {
            console.error(`[Bad Request Exception] ${err.name}:\n${err.message}\n${err.stack}`);
            throw new BadRequestException(err.message);
          } else {
            console.error(`[Uncaught Exception] ${err.name}:\n${err.message}\n${err.stack}`);
            throw new InternalServerErrorException(err.message);
          }
        })
      );
  }
}
