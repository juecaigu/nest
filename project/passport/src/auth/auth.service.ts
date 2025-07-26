import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  validateUser(
    username: string,
    pass: string,
  ): { username: string; userId: number } | null {
    const user = this.usersService.findOne(username);
    if (user && user.password === pass) {
      return { username: user.username, userId: user.userId };
    }
    return null;
  }
}
