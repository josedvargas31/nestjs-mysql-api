import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  // injects the Post entity and the UsersService
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>, // consults the Post entity (table for the posts in the database)
    private usersService: UsersService, // injects the UsersService
  ) {}

  // async method to create a post
  async createPost(post: CreatePostDto) {
    const userFound = await this.usersService.getUserById(post.authorId); // calls the getUserById method from the UsersService

    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const newPost = this.postsRepository.create(post);
    return this.postsRepository.save(newPost);
  }

  // get all posts
  getAllPost() {
    return this.postsRepository.find();
  }

}
