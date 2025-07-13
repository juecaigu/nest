import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import fs from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { name: string },
  ) {
    if (body?.name) {
      try {
        fs.accessSync('temp');
      } catch (error) {
        fs.mkdirSync('temp');
        console.log('mkdir', error);
      }
      fs.writeFileSync(`temp/${body.name}`, file.buffer);
    }
  }
  @Post('merge')
  merge(@Body() body: { name: string }) {
    const tempDir = 'temp';
    const chunkDir = 'uploads';
    try {
      fs.accessSync(tempDir);
      fs.mkdirSync(chunkDir);
      const files = fs.readdirSync(tempDir);
      let count = 0;
      let startPos = 0;
      files.forEach((file) => {
        const stream = fs.createReadStream(`${tempDir}/${file}`);
        stream
          .pipe(
            fs.createWriteStream(`${chunkDir}/${body.name}`, {
              start: startPos,
            }),
          )
          .on('finish', () => {
            count++;
            if (count === files.length) {
              // 合并完成后删除临时文件夹
              fs.rmdirSync(tempDir, {
                recursive: true,
              });
            }
          });
        startPos += fs.statSync(`${tempDir}/${file}`).size;
      });
    } catch (error) {
      console.log('there is no uploads folder', error);
    }
  }
}
