import { Blog } from '../blogs/blog.entity';
import { registerEnumType } from '@nestjs/graphql';
//import UserRole from './user.enum';

export interface IUser {
  id: number;
  name: string;
  surname: string;
  role: UserRole;
  blogs?: Blog[];
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  WRITER = 'writer',
  MODERATOR = 'moderator',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});

export interface IUserCreateDTO {
  name: IUser['name'];
  surname: IUser['surname'];
  role: IUser['role'];
}

export interface IUserUpdateDTO extends IUserCreateDTO {
  id: IUser['id'];
}
