import { CustomError } from "@/lib/errors/custom-error";

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(message: string, errors?: any) {
    super(message, errors);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return { message: this.message, errors: this.errors };
  }
}
