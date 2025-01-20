import { Body, Controller, Get, Post, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  //   get all users
  @Get()
  GetAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  // get user by id
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.getUserById(id)
  }

  //  create a new user
  @Post()
  CreateUser(@Body() newUser: createUserDto): Promise<User> {
    return this.usersService.createUser(newUser);
  }
}
