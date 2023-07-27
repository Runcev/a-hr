import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ArgsType, Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IPost, IPostCreateDTO, IPostUpdateDTO } from './post.types';
import { Blog } from '../blogs/blog.entity';
import { Max, Min } from 'class-validator';

@Entity('posts')
@ObjectType()
export class Post implements IPost {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field({ nullable: false })
  title: string;

  @Column()
  @Field({ nullable: false })
  text: string;

  @Column()
  @Field(() => Int)
  blogId: number;

  @ManyToOne(() => Blog, (blog) => blog.posts, { onDelete: 'CASCADE' })
  @Field(() => Blog, { nullable: false })
  blog: Blog;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}

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
