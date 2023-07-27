import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './blog.entity';
import { BlogService } from './blog.service';
import { BlogResolver } from './blog.resolver';
import { UserModule } from '../users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Blog]), UserModule],
  providers: [BlogService, BlogResolver],
  exports: [TypeOrmModule, BlogService],
})
export class BlogModule {}
