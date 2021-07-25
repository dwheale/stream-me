import { Arg, Mutation, Resolver } from 'type-graphql';
import { UserResponse } from '../types/UserResponse';
import { AuthInput } from '../types/AuthInput';
import { UserModel } from '../entities/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { DEFAULT_SESSION_SECRET } from '../defaults';

@Resolver()
export class AuthResolver {
  @Mutation(() => UserResponse)
  async register(@Arg('input') { email, password }: AuthInput): Promise<UserResponse> {
    // 1. check for existing email
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) throw new Error('Email already in use.');

    // 2. create a new user with a hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ email, password: hashedPassword });
    await user.save();

    // 3. store user id on the token payload
    const payload = {
      id: user.id,
    }

    const token = jwt.sign(payload, process.env.SESSION_SECRET || DEFAULT_SESSION_SECRET)

    return { user, token };
  }

  @Mutation(() => UserResponse)
  async login(@Arg('input') { email, password }: AuthInput): Promise<UserResponse> {
    // 1. check for existing email
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) throw new Error('Invalid login');

    // 2. check if the password is valid
    const valid = await bcrypt.compare(password, existingUser.password);

    if (!valid) throw new Error('Invalid login');

    // 3. store user id on the token payload
    const payload = {
      id: existingUser.id,
    }

    const token = jwt.sign(payload, process.env.SESSION_SECRET || DEFAULT_SESSION_SECRET)

    return { user: existingUser, token };
  }
}