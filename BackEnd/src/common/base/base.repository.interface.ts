
import {
  Document,
  ProjectionType,
  QueryOptions,
  SaveOptions,
  UpdateQuery,
} from "mongoose";
export type RepositoryFilter = Record<string, unknown>;

export interface IBaseRepository<TDocument extends Document> {


  create(
    payload: Partial<TDocument>,
    options?: SaveOptions
  ): Promise<TDocument>;

  findById(
    id: string,
    projection?: ProjectionType<TDocument>,
    options?: QueryOptions<TDocument>
  ): Promise<TDocument | null>;

  findOne(
    filter: RepositoryFilter,
    projection?: ProjectionType<TDocument>,
    options?: QueryOptions<TDocument>
  ): Promise<TDocument | null>;


  findMany(
    filter?: RepositoryFilter,
    projection?: ProjectionType<TDocument>,
    options?: QueryOptions<TDocument>
  ): Promise<TDocument[]>;

  updateById(
    id: string,
    update: UpdateQuery<TDocument>,
    options?: QueryOptions<TDocument>
  ): Promise<TDocument | null>;

  updateOne(
    filter: RepositoryFilter,
    update: UpdateQuery<TDocument>,
    options?: QueryOptions<TDocument>
  ): Promise<TDocument | null>;

  updateMany(
    filter: RepositoryFilter,
    update: UpdateQuery<TDocument>,
    options?: Record<string, unknown>
  ): Promise<unknown>;

  deleteById(
    id: string,
    options?: QueryOptions<TDocument>
  ): Promise<TDocument | null>;

  deleteOne(
    filter: RepositoryFilter,
    options?: Record<string, unknown>
  ): Promise<unknown>;

  deleteMany(
    filter: RepositoryFilter,
    options?: Record<string, unknown>
  ): Promise<unknown>;

  exists(
    filter: RepositoryFilter
  ): Promise<boolean>;

  count(
    filter?: RepositoryFilter
  ): Promise<number>;
}