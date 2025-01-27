import {
  Controller,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  create(@Body() post: CreatePostDto) {
    return this.postsService.createPost(post);
  }

  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }
}
