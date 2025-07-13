import { DynamicModule, Global, Module } from '@nestjs/common';
import { LoggerOptions } from 'winston';
import { CustomeLogger } from './custome.logger';
export const WINSTON_LOGGER_TOKEN = 'WINSTON_LOGGER_TOKEN';

@Global()
@Module({})
export class WinstonModule {
  public static registry(options?: LoggerOptions): DynamicModule {
    return {
      module: WinstonModule,
      providers: [
        {
          provide: WINSTON_LOGGER_TOKEN,
          useValue: new CustomeLogger(options),
        },
      ],
      exports: [WINSTON_LOGGER_TOKEN],
    };
  }
}
