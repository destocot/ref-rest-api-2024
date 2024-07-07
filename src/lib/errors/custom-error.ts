export abstract class CustomError extends Error {
  abstract statusCode: number;
  errors?: any;

  constructor(message: string, errors?: any) {
    super(message);
    this.errors = errors;
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; errors?: any };
}
