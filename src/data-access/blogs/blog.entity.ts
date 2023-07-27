import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import { IBlog } from './blog.types';
import { User } from '../users/user.entity';
import { Post } from '../posts/post.entity';

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
