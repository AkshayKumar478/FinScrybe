import { AppError } from "./AppError";
import {HttpStatus} from '../constants/httpstatus'
import {ErrorMessage} from '../constants/messages'

export class ForbiddenError extends AppError {
  constructor(message:string) {
    super(message, HttpStatus.FORBIDDEN);
  }
}
