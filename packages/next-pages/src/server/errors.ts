export class RequestError extends Error {
  statusCode: number;
  statusText: string;
  constructor(statusCode: number, statusText: string, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.statusText = statusText;
  }
}

export class NotFoundError extends RequestError {
  constructor(message = 'The resource is not found') {
    super(404, 'NotFount', message);
  }
}

export class BadRequestError extends RequestError {
  errors?: unknown;
  constructor(message: string, errors?: unknown) {
    super(400, 'BadRequest', message);
    this.errors = errors;
  }
}

export class ConflictError extends RequestError {
  code: string;
  constructor(code: string, message: string) {
    super(409, 'Conflict', message);
    this.code = code;
  }
}
