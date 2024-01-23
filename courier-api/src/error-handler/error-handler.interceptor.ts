import { 
  BadRequestException,
  CallHandler, 
  ExecutionContext, 
  Injectable, 
  InternalServerErrorException, 
  Logger, 
  NestInterceptor 
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { CustomError } from '@errors/custom-errors';

@Injectable()
export class ErrorHandlerInterceptor implements NestInterceptor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError((err: Error) => {
          const logger = new Logger('ErrorInterceptor');
          if (err instanceof CustomError) {
            logger.error(`>> [Bad Request Exception] ${err.message}`);
            throw new BadRequestException(err.message);
          } else {
            logger.error(`>> [Uncaught Exception]\n${err.stack}`);
            throw new InternalServerErrorException();
          }
        })
      );
  }
}
