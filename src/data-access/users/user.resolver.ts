import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { forwardRef, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserCreateInput, UserUpdateInput } from './user.entity';
import { GraphQLBoolean } from 'graphql/type';

@Resolver(() => User)
export class UserResolver {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  @Query(() => [User], { name: 'users', nullable: true })
  async getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user', nullable: true })
  async getUsersById(@Args({ name: 'id', type: () => Int }) id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Mutation(() => User, { name: 'createUser' })
  async createUser(@Args('data') input: UserCreateInput): Promise<User> {
    return this.userService.create(input);
  }

  @Mutation(() => User, { name: 'updateUser' })
  async updateUser(@Args('data') input: UserUpdateInput): Promise<User> {
    return this.userService.update(input);
  }

  @Mutation(() => GraphQLBoolean, { nullable: true })
  async deleteUser(@Args({ name: 'id', type: () => Int }) id: number) {
    return await this.userService.delete(id);
  }
}
