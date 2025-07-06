import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CustomPipe implements PipeTransform {
  transform(value: number) {
    if (typeof value !== 'number') {
      throw new BadRequestException('must be a number');
    }
    return value * 2;
  }
}
