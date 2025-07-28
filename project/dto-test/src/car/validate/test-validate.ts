import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint()
export class TestValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    console.log('vvvv', value, args);
    const validateOptions = args.constraints[0] as string;
    return value === validateOptions;
  }
  // 也可以是异步的任务
  //   async validate(value: any, args: ValidationArguments): Promise<boolean> {
  //     return new Promise((resolve) => {
  //       setTimeout(() => {
  //         const validateOptions = args.constraints[0] as string;
  //         resolve(value === validateOptions);
  //       }, 1000);
  //     });
  //   }

  defaultMessage(args: ValidationArguments) {
    const validateOptions = args.constraints[0] as string;
    return `The value is not equal to ${validateOptions}`;
  }
}
