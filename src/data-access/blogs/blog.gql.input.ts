import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { IBlogCreateDTO, IBlogUpdateDTO } from './blog.types';
import { Max, Min } from 'class-validator';

@InputType()
export class BlogCreateInput implements IBlogCreateDTO {
  @Field({ nullable: false })
  subject: string;
  @Field({ nullable: false })
  title: string;
  @Field(() => Int, { nullable: false })
  userId: number;
}

@InputType()
export class BlogUpdateInput implements IBlogUpdateDTO {
  @Field(() => Int, { nullable: false })
  id: number;
  @Field({ nullable: true })
  title: string;
  @Field({ nullable: true })
  subject: string;
}

@ArgsType()
export class FetchBlogsArgs {
  @Field(() => Int)
  @Min(0)
  skip = 0;

  @Field(() => Int)
  @Min(1)
  @Max(50)
  take = 25;
}
