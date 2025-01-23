import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { updateUserDto } from './dto/update-user.dto';

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
  getUserById(@Param('id', ParseIntPipe) id: number){
    return this.usersService.getUserById(id);
  }

  //  create a new user
  @Post()
  CreateUser(@Body() newUser: createUserDto) {
    return this.usersService.createUser(newUser);
  }

  //  delete user by id
  @Delete(':id')
  deleteUserById(@Param('id') id: number) {
    return this.usersService.deleteUserById(Number(id));
  }

  //  update user by id
  @Put(':id')
  updateUserById(@Param('id') id: number, @Body() user: updateUserDto) {
    return this.usersService.updateUserById(Number(id), user);
  }
}
