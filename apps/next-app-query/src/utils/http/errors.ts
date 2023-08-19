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
  code: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}
