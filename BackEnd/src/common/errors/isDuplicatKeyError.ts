import mongoose from "mongoose";
import { HttpStatus } from "../constants/httpstatus";

export const isDuplicateKeyError = (
  error: unknown
): error is mongoose.mongo.MongoServerError => {
  return (
    error instanceof mongoose.mongo.MongoServerError &&
    error.code === HttpStatus.MONGOOSE_DUPLICATE_KEY_ERROR
  );
};