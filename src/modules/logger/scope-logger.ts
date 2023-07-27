import { v4 as uuidv4 } from 'uuid';
import { NotImplementedException, LoggerService as NestLoggerService } from '@nestjs/common';
import { LoggerService } from './logger.service';

export class ScopeLogger implements NestLoggerService {
  public constructor(
    private readonly loggerService: LoggerService,
    public readonly correlationId: string,
  ) {
    this.correlationId = correlationId || uuidv4();
  }

  public log(message: any, context?: string): any {
    this.loggerService.log(message, context, this.correlationId);
  }

  public error(message: any, trace?: string, context?: string): any {
    this.loggerService.error(message, trace, context, this.correlationId);
  }

  public warn(message: any, context?: string): any {
    this.loggerService.warn(message, context, this.correlationId);
  }

  public debug(message: any, context?: string): any {
    this.loggerService.debug(message, context, this.correlationId);
  }

  /**
   * @deprecated Not Implemented
   */
  public verbose(): any {
    throw new NotImplementedException();
  }
}
