import { Injectable } from '@nestjs/common';

const users = [
  {
    username: 'jiang',
    githubId: '54015003',
    password: '123456',
  },
  {
    username: 'zhangsan',
    password: '888888',
  },
];

@Injectable()
export class AppService {
  findUserByGithubId(githubId: string) {
    return users.find((user) => user.githubId === githubId);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
