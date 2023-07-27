import { Blog } from '../blogs/blog.entity';

export interface IPost {
  id: number;
  title: string;
  text: string;
  blogId: number;
  blog: Blog;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPostCreateDTO {
  title: IPost['title'];
  text: IPost['text'];
  blogId: IPost['blogId'];
}

export interface IPostUpdateDTO {
  id: IPost['id'];
  title: IPost['title'];
  text: IPost['text'];
}
