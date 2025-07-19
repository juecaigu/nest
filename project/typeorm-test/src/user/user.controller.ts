import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('find')
  findAll() {
    return this.userService.findAll();
  }

  @Get('findOne')
  findOne(@Query('id') id: number) {
    console.log('id', id);
    return this.userService.findOne(id);
  }

  @Post('update')
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @Get('delete/:id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
