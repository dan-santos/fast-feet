export abstract class CustomError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class ResourceNotFoundError extends CustomError {
  constructor(resourceName: string) {
    super(`${resourceName} not found.`);
  }
}

export class ForbiddenError extends CustomError {
  constructor() {
    super('Forbidden.');
  }
}

export class ConflictError extends CustomError {
  constructor(resourceName: string) {
    super(`${resourceName} already exists.`);
  }
}

export class WrongCredentialsError extends CustomError {
  constructor() {
    super('Wrong credentials.');
  }
}

export class InvalidEmailError extends CustomError {
  constructor(email: string) {
    super(`Email "${email}" is not a valid email.`);
  }
}

export class InvalidIdError extends CustomError {
  constructor(id: string) {
    super(`ID "${id}" is not a valid UUID string.`);
  }
}

export class InsuficientArgumentsError extends CustomError {
  constructor(operation: string) {
    super(`Unable to "${operation}" without sufficient arguments.`);
  }
}