import 'server-only';

export class NotFoundError extends Error {
  constructor(message = 'The resource is not found') {
    super(message);
  }
}

export class BadRequestError extends Error {
  errors?: unknown;
  constructor(message: string, errors?: unknown) {
    super(message);
    this.errors = errors;
  }
}

export class ConflictError extends Error {
  code: number;
  constructor(message: string) {
    super(message);
    this.code = 409;
  }
}

export class UnauthorizedError extends Error {
  code: number;
  constructor(message?: string) {
    super(message);
    this.code = 401;
  }
}
