import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';

import { createProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>
  ) {}

  //  create a new user
  async createUser(user: createUserDto) {
    const userFound = await this.usersRepository.findOne({
      where: {
        username: user.username,
      },
    });

    if (userFound) {
      return new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  //   get all users
  getAllUsers() {
    return this.usersRepository.find();
  }

  //  get user by id
  async getUserById(id: number) {
    const userFound = await this.usersRepository.findOne({
      where: { id },
    });
    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return userFound;
  }

  // delete user by id
  async deleteUserById(id: number) {
    const result = await this.usersRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  // update user by id
  async updateUserById(id: number, user: updateUserDto) {
    const userFound = await this.usersRepository.findOne({
      where: { id },
    });
    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const updateUser = Object.assign(userFound, user);
    return this.usersRepository.save(updateUser);
  }

  async createProfile(id: number, profile: createProfileDto) {
    const userFound = await this.usersRepository.findOne({ // find user by id
      where: {
        id,
      },
    });
    if(!userFound) { // if user not found
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const newProfile = this.profileRepository.create(profile) // create profile

    const saveProfile = await  this.profileRepository.save(newProfile) // save profile

    userFound.profile = saveProfile; // assign profile to user

    return this.usersRepository.save(userFound); // save user
  }
}
