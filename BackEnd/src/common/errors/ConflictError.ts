import { AppError } from "./AppError";
import {HttpStatus} from '../constants/httpstatus'
import {ErrorMessage} from '../constants/messages'

export class ConflictError extends AppError {
  constructor(message:string) {
    super(message, HttpStatus.RESOURCE_CONFLICT);
  }
}
