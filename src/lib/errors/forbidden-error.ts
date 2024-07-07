import { CustomError } from "@/lib/errors/custom-error";

export class ForbiddenError extends CustomError {
  statusCode = 403;

  constructor(message = "Forbidden") {
    super(message);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }

  serializeErrors() {
    return { message: this.message };
  }
}
