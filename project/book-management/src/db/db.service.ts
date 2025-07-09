import { Inject, Injectable } from '@nestjs/common';
import { DbModuleOptions } from './db.module';
import { access, readFile, writeFile } from 'fs/promises';

@Injectable()
export class DbService {
  constructor(@Inject('OPTIONS') private options: DbModuleOptions) {}
  async read(): Promise<any[]> {
    const filePath = `src/db/json/${this.options.path}`;
    try {
      await access(filePath);
    } catch (error) {
      console.error('files has no permission', error);
      return [];
    }
    const str: string = await readFile(filePath, {
      encoding: 'utf-8',
    });
    if (!str) {
      return [];
    }
    return JSON.parse(str) as any[];
  }
  async write(obj: Record<string, any>) {
    const filePath = `src/db/json/${this.options.path}`;
    try {
      await writeFile(filePath, JSON.stringify(obj) || [], {
        encoding: 'utf-8',
      });
    } catch (error) {
      console.log('写入失败，', error);
    }
  }
}
