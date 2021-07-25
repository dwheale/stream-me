import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../types/MyContext';
import jwt from 'jsonwebtoken';
import { DEFAULT_SESSION_SECRET } from '../defaults';

const APP_SECRET = process.env.SESSION_SECRET || DEFAULT_SESSION_SECRET;
/**
 * Checks the Gql headers to see if the user is authenticated
 */
export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const authorization = context.req.headers['authorization'];
  try {
    const token = authorization?.replace('Bearer ', '') || '';
    const user = <jwt.JwtPayload>jwt.verify(token, APP_SECRET);
    context.res.locals.userId = user?.id;
    return next();
  } catch (err) {
    throw err;
  }
}
