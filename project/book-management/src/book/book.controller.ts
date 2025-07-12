import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import path from 'path';
import { storage } from './common/file-storage';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('list')
  list() {
    return this.bookService.list();
  }

  @Get('find')
  findById(@Query('id', ParseIntPipe) id: number) {
    return this.bookService.findById(id);
  }

  @Post('create')
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Put('update')
  update(@Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(updateBookDto);
  }

  @Delete('delete/:id')
  delete(@Param('id', ValidationPipe) id: number) {
    return this.bookService.delete(id);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: storage,
      limits: {
        fileSize: 1024 * 1024 * 5, // 5MB
      },
      fileFilter(req, file, callback) {
        const extname = path.extname(file.originalname);
        if (['.png', '.jpg', '.jpeg', '.gif'].includes(extname)) {
          callback(null, true);
        } else {
          callback(new BadRequestException('只能上传 png/jpg/jpeg/gif'), false);
        }
      },
    }),
  )
  upload(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    return file.path;
  }
}
