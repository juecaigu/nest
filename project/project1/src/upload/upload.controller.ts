import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/file')
export class UploadController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'disk',
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body) {
    console.log('file', file);
    console.log('body', body);
  }
}
