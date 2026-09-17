
import {HttpStatus} from '../constants/httpstatus'
export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = new.target.name;
  }
}
