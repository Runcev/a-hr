import { Post } from '../posts/post.entity';
import { User } from '../users/user.entity';

export interface IBlog {
  id: number;
  title: string;
  subject: string;
  user: User;
  userId: number;
  posts?: Post[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IBlogCreateDTO {
  title: IBlog['title'];
  subject: IBlog['subject'];
  userId: IBlog['userId'];
}

export interface IBlogUpdateDTO extends Omit<IBlogCreateDTO, 'userId'> {
  id: IBlog['id'];
  title: IBlog['title'];
  subject: IBlog['subject'];
}
