import { Validate, ValidationOptions } from 'class-validator';
import { TestValidator } from './test-validate';
import { applyDecorators } from '@nestjs/common';

export function TestValidate(content: string, options?: ValidationOptions) {
  return applyDecorators(Validate(TestValidator, [content], options));
}
