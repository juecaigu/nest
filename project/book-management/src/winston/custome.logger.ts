import { LoggerService } from '@nestjs/common';
import {
  createLogger,
  Logger,
  transports,
  format,
  LoggerOptions,
} from 'winston';
import chalk from 'chalk';
import dayjs from 'dayjs';

export class CustomeLogger implements LoggerService {
  private logger: Logger;
  constructor(options?: LoggerOptions) {
    this.logger = createLogger(
      options || {
        level: 'debug',
        transports: [
          new transports.Console({
            format: format.combine(
              format.colorize(),
              format.printf(({ context, level, message, time }) => {
                const appStr = chalk.green('[NEST]');
                const contetStr = chalk.red(`[${context as any}]`);
                return `${appStr} ${contetStr} ${level} ${message as string} ${time as string}`;
              }),
            ),
          }),
          new transports.File({
            format: format.combine(format.json()),
            filename: 'test.log',
            dirname: 'logs',
          }),
        ],
      },
    );
  }
  log(message: string, context?: string) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    this.logger.info(message, { context, time });
  }
  error(message: string, trace?: string, context?: string) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    this.logger.error(message, { trace, context, time });
  }
  warn(message: string, context?: string) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    this.logger.warn(message, { context, time });
  }
}
