import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { BlogModule } from '../blogs/blog.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), BlogModule],
  providers: [PostService, PostResolver],
  exports: [TypeOrmModule, PostService],
})
export class PostModule {}
