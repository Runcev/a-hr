import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { forwardRef, Inject } from '@nestjs/common';
import { GraphQLBoolean } from 'graphql/type';
import { FetchPostsArgs, Post, PostCreateInput, PostUpdateInput } from './post.entity';
import { PostService } from './post.service';
import { Blog } from '../blogs/blog.entity';

@Resolver(() => Post)
export class PostResolver {
  constructor(
    @Inject(forwardRef(() => PostService))
    private readonly postService: PostService,
  ) {}

  @Query(() => [Post], { name: 'posts', nullable: true })
  async getPosts(@Args() args: FetchPostsArgs): Promise<Post[]> {
    return this.postService.findAll(args);
  }

  @ResolveField(() => Blog)
  blog(@Parent() post: Post): Promise<Blog> {
    return this.postService.getBlog(post.blogId);
  }

  @Query(() => Post, { name: 'post', nullable: true })
  async getPostById(@Args({ name: 'id', type: () => Int }) id: number): Promise<Post> {
    return this.postService.findOne(id);
  }

  @Mutation(() => Post, { name: 'createPost' })
  async createPost(@Args('data') input: PostCreateInput): Promise<Post> {
    return this.postService.create(input);
  }

  @Mutation(() => Post, { name: 'updatePost' })
  async updatePost(@Args('data') input: PostUpdateInput): Promise<Post> {
    return this.postService.update(input);
  }

  @Mutation(() => GraphQLBoolean, { nullable: true })
  async deletePost(@Args({ name: 'id', type: () => Int }) id: number) {
    return await this.postService.delete(id);
  }
}
