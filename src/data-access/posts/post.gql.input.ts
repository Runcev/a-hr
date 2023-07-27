import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { IPostCreateDTO, IPostUpdateDTO } from './post.types';
import { Max, Min } from 'class-validator';

@InputType()
export class PostCreateInput implements IPostCreateDTO {
  @Field(() => Int, { nullable: false })
  blogId: number;
  @Field({ nullable: false })
  text: string;
  @Field({ nullable: false })
  title: string;
}

@InputType()
export class PostUpdateInput implements IPostUpdateDTO {
  @Field(() => Int, { nullable: false })
  id: number;
  @Field({ nullable: true })
  text: string;
  @Field({ nullable: true })
  title: string;
}

@ArgsType()
export class FetchPostsArgs {
  @Field(() => Int)
  @Min(0)
  skip = 0;

  @Field(() => Int)
  @Min(1)
  @Max(50)
  take = 25;
}
