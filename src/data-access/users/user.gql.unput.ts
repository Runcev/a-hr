import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { IUserCreateDTO, IUserUpdateDTO, UserRole } from './user.types';

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
