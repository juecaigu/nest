import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata) {
    console.log('value', value, metadata);
    if (Number.isNaN(parseInt(value as string))) {
      throw new BadRequestException(`参数 ${metadata.data} 类型错误`);
    }
    return value;
  }
}
