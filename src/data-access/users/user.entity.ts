import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IUser, UserRole } from './user.types';
import { Blog } from '../blogs/blog.entity';

@Entity('users')
@ObjectType()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field({ nullable: false })
  name: string;

  @Column()
  @Field({ nullable: false })
  surname: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.WRITER,
  })
  @Field(() => UserRole)
  role: UserRole;

  @OneToMany(() => Blog, (blog) => blog.user, { nullable: true, eager: true, cascade: true })
  @Field((type) => [Blog], { nullable: true })
  blogs?: Blog[];

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
