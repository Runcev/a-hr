import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserCreateInput, UserUpdateInput } from './user.entity';
import { IUser } from './user.types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async findAll(): Promise<IUser[]> {
    return this.userRepository.find({
      relations: {
        blogs: true,
      },
    });
  }

  public async findOne(id: number): Promise<IUser> {
    return this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        blogs: true,
      },
    });
  }

  public async create(user: UserCreateInput): Promise<IUser> {
    return this.userRepository.save(user);
  }

  public async update(user: UserUpdateInput): Promise<IUser> {
    return this.userRepository.save(user);
  }

  public async delete(id: number): Promise<boolean> {
    const deleteResult = await this.userRepository.delete({ id });
    return deleteResult.affected > 0;
  }
}
