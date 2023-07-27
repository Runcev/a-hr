import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ArgsType, Field, InputType, Int, ObjectType } from '@nestjs/graphql';

import { IBlog, IBlogCreateDTO, IBlogUpdateDTO } from './blog.types';
import { User } from '../users/user.entity';
import { Post } from '../posts/post.entity';
import { Max, Min } from 'class-validator';

@Entity('blogs')
@ObjectType()
export class Blog implements IBlog {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field({ nullable: false })
  title: string;

  @Column()
  @Field({ nullable: false })
  subject: string;

  @ManyToOne(() => User, (user) => user.blogs, { onDelete: 'CASCADE' })
  @Field(() => User, { nullable: false })
  user: User;

  @Column()
  @Field(() => Int)
  userId: number;

  @OneToMany(() => Post, (post) => post.blog, { nullable: true, eager: true, cascade: true })
  @Field(() => [Post], { nullable: true })
  posts?: Post[];

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}

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
