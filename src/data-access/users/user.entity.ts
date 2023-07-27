import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ArgsType, Field, InputType, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IUser, IUserCreateDTO, IUserUpdateDTO, UserRole } from './user.types';
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

@InputType()
@ArgsType()
export class UserCreateInput implements IUserCreateDTO {
  @Field({ nullable: false })
  name: string;
  @Field({ nullable: false })
  surname: string;
  @Field(() => UserRole)
  role: UserRole;
}

@InputType()
@ArgsType()
export class UserUpdateInput implements IUserUpdateDTO {
  @Field(() => Int, { nullable: false })
  id: number;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  surname: string;
  @Field(() => UserRole, { nullable: true })
  role: UserRole;
}
