import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { DbService } from 'src/db/db.service';
import { Book } from './entities/book.entities';

const generateId = () => {
  return Math.floor(Math.random() * 1000000);
};

@Injectable()
export class BookService {
  @Inject(DbService)
  dbService: DbService;

  async list() {
    const books: Book[] = (await this.dbService.read()) as Book[];
    return books;
  }
  async findById(id: number) {
    const books: Book[] = (await this.dbService.read()) as Book[];
    return books.find((book) => book.id === id) || {};
  }
  async create(createBookDto: CreateBookDto) {
    try {
      const books: Book[] = (await this.dbService.read()) as Book[];
      const book = new Book();
      book.id = generateId();
      book.name = createBookDto.name;
      book.author = createBookDto.author;
      book.description = createBookDto.description;
      book.cover = createBookDto.cover;
      books.push(book);
      await this.dbService.write(books);
      return { id: book.id };
    } catch (error) {
      console.error('create book failed', error);
      throw new InternalServerErrorException('Failed to create book');
    }
  }
  async update(updateBookDto: UpdateBookDto) {
    try {
      const books: Book[] = (await this.dbService.read()) as Book[];
      const book = books.find((book) => book.id === updateBookDto.id);
      if (!book) {
        throw new NotFoundException('Book not found');
      }
      book.name = updateBookDto.name;
      book.author = updateBookDto.author;
      book.description = updateBookDto.description;
      book.cover = updateBookDto.cover;
      await this.dbService.write(books);
      return 'update success';
    } catch (error) {
      console.error('update book failed', error);
      throw new InternalServerErrorException('Failed to update book');
    }
  }
  async delete(id: number) {
    try {
      const books: Book[] = (await this.dbService.read()) as Book[];
      const book = books.find((book) => book.id === id);
      if (!book) {
        throw new NotFoundException('Book not found');
      }
      books.splice(books.indexOf(book), 1);
      await this.dbService.write(books);
      return 'delete success';
    } catch (error) {
      console.error('delete book failed', error);
      throw new InternalServerErrorException('Failed to delete book');
    }
  }
}
