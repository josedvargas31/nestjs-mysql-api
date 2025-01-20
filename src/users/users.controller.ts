import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  //   get all users
  @Get()
  GetAllUsers() {
    return this.usersService.getAllUsers();
  }
  //  create a new user
  @Post()
  CreateUser(@Body() newUser: createUserDto) {
    return this.usersService.createUser(newUser);
  }
}
