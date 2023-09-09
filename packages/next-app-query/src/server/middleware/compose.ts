import { type NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NextHandler<TContext = any> = (ctx?: TContext) => Promise<NextResponse>;

export type Middleware<TContext> = (
  request: Request,
  ctx: TContext,
  next: NextHandler<TContext>
) => Promise<NextResponse>;

// original compose source:
// https://github.com/negezor/middleware-io/blob/master/src/compose.ts

export function compose<TContext = unknown>(...middlewares: Middleware<TContext>[]): Middleware<TContext> {
  return async (request: Request, rootCtx: TContext): Promise<NextResponse> => {
    let lastIndex = -1;
    const nextDispatch = async (index: number, ctx?: TContext): Promise<NextResponse> => {
      if (index <= lastIndex) {
        throw new Error('next() called multiple times');
      }
      lastIndex = index;
      const middleware = middlewares.length !== index ? middlewares[index] : undefined;
      if (!middleware) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return undefined as any;
      }
      return middleware(request, ctx ?? rootCtx, (ctx) => nextDispatch(index + 1, ctx));
    };
    return nextDispatch(0);
  };
}
