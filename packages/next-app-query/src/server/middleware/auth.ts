import { type Session } from 'next-auth';
import { getServerAuthSession } from '../auth';
import { type NextHandler } from './compose';
import { UnauthorizedError } from '../utils/errors';

export interface AuthRequestContext {
  session: Session | null;
}

export const auth = async (request: Request, ctx: AuthRequestContext, next: NextHandler<AuthRequestContext>) => {
  // when we don't have a session (no or invalid session cookie), we are unauthorized
  const session = await getServerAuthSession();
  if (!session) {
    throw new UnauthorizedError();
  }

  // pass session to downstream middlewares
  return next({
    ...ctx,
    session,
  });
};
