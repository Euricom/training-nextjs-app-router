import 'server-only';
import { StatusCodes } from 'http-status-codes';

export class RequestError extends Error {
  status: number;
  details?: unknown;
  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export class NotFoundError extends RequestError {
  constructor(message = 'The resource is not found') {
    super(StatusCodes.NOT_FOUND, message);
  }
}

export class ConflictError extends RequestError {
  constructor(details: unknown, message = 'A business rule is violated') {
    super(StatusCodes.CONFLICT, message, details);
  }
}

export class UnauthorizedError extends RequestError {
  constructor(message = 'Missing or invalid authorization') {
    super(StatusCodes.UNAUTHORIZED, message);
  }
}
