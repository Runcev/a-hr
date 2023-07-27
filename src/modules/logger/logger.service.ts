import { Injectable, Inject, Scope, NotImplementedException, ConsoleLogger } from '@nestjs/common';
import * as uuid from 'uuid';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { SERVICE_NAME } from '../../shared/constants/service-name.const';
import { ScopeLogger } from './scope-logger';

export enum LogLevel {
  ERROR = 'error',
  WARNING = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  public readonly service: string;

  public constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly winston: any) {
    super();
    this.service = SERVICE_NAME;
  }

  public log(message: any, context?: string, correlationId?: string): any {
    this.winston.log(LogLevel.INFO, this.buildLogObject(message, context, correlationId));
  }

  public error(message: any, trace?: string, context?: string, correlationId?: string): any {
    this.winston.log(LogLevel.ERROR, this.buildLogObject(message, context, correlationId, trace));
  }

  public warn(message: any, context?: string, correlationId?: string): any {
    this.winston.log(LogLevel.WARNING, this.buildLogObject(message, context, correlationId));
  }

  public debug(message: any, context?: string, correlationId?: string): any {
    this.winston.log(LogLevel.DEBUG, this.buildLogObject(message, context, correlationId));
  }

  /**
   * @deprecated Not Implemented
   */
  public verbose(): any {
    throw new NotImplementedException();
  }

  private buildLogObject(
    message: any,
    context?: string,
    correlationId?: string,
    trace?: string,
  ): LogObject {
    const module = context || this.context;

    let data: LogObject = {
      service: this.service,
      trace,
      module: module?.replace('Controller', ''),
      correlationId: uuid.validate(correlationId) ? correlationId : this.newCorrelationId(),
    };

    if (message instanceof Object) {
      data = { ...data, ...message };
    } else {
      data.message = message;
    }

    return data;
  }

  public toScopeLogger(correlationId: string): ScopeLogger {
    return new ScopeLogger(this, correlationId);
  }

  private newCorrelationId(): string {
    const correlationId = uuid.v4();
    this.warn(
      `New correlation id:${correlationId} was generated`,
      LoggerService.name,
      correlationId,
    );

    return correlationId;
  }
}
