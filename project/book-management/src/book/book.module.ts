import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [
    DbModule.registry({
      path: 'book.json',
    }),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
