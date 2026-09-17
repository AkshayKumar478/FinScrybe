import { AppError } from "./AppError";
import {HttpStatus} from '../constants/httpstatus'
import {ErrorMessage} from '../constants/messages'

export class NotFoundError extends AppError {
  constructor(message:string) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
