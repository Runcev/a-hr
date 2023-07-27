import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FetchPostsArgs, Post, PostCreateInput, PostUpdateInput } from './post.entity';
import { BlogService } from '../blogs/blog.service';
import { Blog } from '../blogs/blog.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private blogService: BlogService,
  ) {}

  public async findAll(args: FetchPostsArgs): Promise<Post[]> {
    const { skip, take} = args;
    return this.postRepository.find({
      skip,
      take,
    });
  }

  public async findOne(id: number): Promise<Post> {
    return this.postRepository.findOneBy({ id });
  }

  public async create(post: PostCreateInput): Promise<Post> {
    return this.postRepository.save(post);
  }

  public async update(post: PostUpdateInput): Promise<Post> {
    return this.postRepository.save(post);
  }

  public async delete(id: number): Promise<any> {
    const deleteResult = await this.postRepository.delete({ id });
    return deleteResult.affected > 0;
  }

  public async getBlog(userId: number): Promise<Blog> {
    return this.blogService.findOne(userId);
  }
}
