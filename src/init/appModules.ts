import { WinstonModule } from 'nest-winston';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from '../data-access/posts/post.module';
import { BlogModule } from '../data-access/blogs/blog.module';
import { UserModule } from '../data-access/users/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { EnvVariablesValidationSchema } from '../config/env.validation';
import configs from '../config/main';

export const initAppModules = [
  ConfigModule.forRoot({
    isGlobal: true,
    load: configs,
    envFilePath: `./env/${
      !process.env.NODE_ENV ? '.env.development' : `.env.${process.env.NODE_ENV}`
    }`,
    validationSchema: EnvVariablesValidationSchema,
    validationOptions: {
      abortEarly: false,
    },
  }),
  WinstonModule.forRootAsync({
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      ...configService.get('winston'),
    }),
  }),
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      ...configService.get('postgresql'),
    }),
  }),
  GraphQLModule.forRoot({
    driver: ApolloDriver,
    autoSchemaFile: true,
  }),

  PostModule,
  BlogModule,
  UserModule,
];
