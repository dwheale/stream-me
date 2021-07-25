import { Field, ObjectType } from 'type-graphql';
import { User } from '../entities/User';

@ObjectType()
export class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => String, { nullable: true })
  token?: string;
}
