import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { forwardRef, Inject } from '@nestjs/common';
import { GraphQLBoolean } from 'graphql/type';
import { Blog, BlogCreateInput, BlogUpdateInput, FetchBlogsArgs } from './blog.entity';
import { BlogService } from './blog.service';
import { User } from '../users/user.entity';

@Resolver(() => Blog)
export class BlogResolver {
  constructor(
    @Inject(forwardRef(() => BlogService))
    private readonly blogService: BlogService,
  ) {}

  @Query(() => [Blog], { name: 'blogs', nullable: true })
  async getBlogs(@Args() args: FetchBlogsArgs): Promise<Blog[]> {
    return this.blogService.findAll(args);
  }

  @ResolveField(() => User)
  user(@Parent() blog: Blog): Promise<User> {
    return this.blogService.getUser(blog.userId);
  }

  @Query(() => Blog, { name: 'blog', nullable: true })
  async getBlogById(@Args({ name: 'id', type: () => Int }) id: number): Promise<Blog> {
    return this.blogService.findOne(id);
  }

  @Mutation(() => Blog, { name: 'createBlog' })
  async createBlog(@Args('data') input: BlogCreateInput): Promise<Blog> {
    return this.blogService.create(input);
  }

  @Mutation(() => Blog, { name: 'updateBlog' })
  async updateBlog(@Args('data') input: BlogUpdateInput): Promise<Blog> {
    return this.blogService.update(input);
  }

  @Mutation(() => GraphQLBoolean, { nullable: true })
  async deleteBlog(@Args({ name: 'id', type: () => Int }) id: number) {
    return await this.blogService.delete(id);
  }
}
