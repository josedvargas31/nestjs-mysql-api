import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  CreateUser(@Body() newUser: createUserDto) {
    return this.usersService.createUser(newUser);
  }
}
