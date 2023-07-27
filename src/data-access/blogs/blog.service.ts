import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';
import { User } from '../users/user.entity';
import { UserService } from '../users/user.service';
import { BlogCreateInput, BlogUpdateInput, FetchBlogsArgs } from './blog.gql.input';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
    private userService: UserService,
  ) {}

  public async findAll(args: FetchBlogsArgs): Promise<Blog[]> {
    const { skip, take } = args;
    return this.blogRepository.find({
      skip,
      take,
    });
  }

  public async findOne(id: number): Promise<Blog> {
    return this.blogRepository.findOneBy({ id });
  }

  public async create(blog: BlogCreateInput): Promise<Blog> {
    return this.blogRepository.save(blog);
  }

  public async update(blog: BlogUpdateInput): Promise<Blog> {
    return this.blogRepository.save(blog);
  }

  public async delete(id: number): Promise<any> {
    const deleteResult = await this.blogRepository.delete({ id });
    return deleteResult.affected > 0;
  }

  public async getUser(userId: number): Promise<User> {
    return this.userService.findOne(userId);
  }
}
