import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IPost } from './post.types';
import { Blog } from '../blogs/blog.entity';

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
