import {
  Document,
  ProjectionType,
  QueryOptions,
  SaveOptions,
  UpdateQuery,
  Model
} from "mongoose";


type RepositoryFilter = Record<string, unknown>;

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
export class BaseRepository<TDocument extends Document> implements IBaseRepository<TDocument> {
  constructor(protected readonly model: Model<TDocument>) {}

  async create(
    payload: Partial<TDocument>,
    options?: SaveOptions
  ): Promise<TDocument> {
    const document = new this.model(payload);
    return document.save(options);
  }
  
  async findById(
    id: string,
    projection?: ProjectionType<TDocument>,
    options?: QueryOptions<TDocument>
  ): Promise<TDocument | null> {
    return this.model.findById(id, projection, options);
  }

  async findOne(
    filter: RepositoryFilter,
    projection?: ProjectionType<TDocument>,
    options?: QueryOptions<TDocument>
  ): Promise<TDocument | null> {
    return this.model.findOne(filter, projection, options);
  }

  async findMany(
    filter: RepositoryFilter = {},
    projection?: ProjectionType<TDocument>,
    options?: QueryOptions<TDocument>
  ): Promise<TDocument[]> {
    return this.model.find(filter, projection, options);
  }

  async updateById(
    id: string,
    update: UpdateQuery<TDocument>,
    options: QueryOptions<TDocument> = { new: true }
  ): Promise<TDocument | null> {
    return this.model.findByIdAndUpdate(id, update, options);
  }

  async updateOne(
    filter: RepositoryFilter,
    update: UpdateQuery<TDocument>,
    options: QueryOptions<TDocument> = { new: true }
  ): Promise<TDocument | null> {
    return this.model.findOneAndUpdate(filter, update, options);
  }

  async updateMany(
    filter: RepositoryFilter,
    update: UpdateQuery<TDocument>,
    options?: Record<string, unknown>
  ) {
    return this.model.updateMany(filter, update, options as never);
  }

  async deleteById(
    id: string,
    options?: QueryOptions<TDocument>
  ): Promise<TDocument | null> {
    return this.model.findByIdAndDelete(id, options);
  }

  async deleteOne(
    filter: RepositoryFilter,
    options?: Record<string, unknown>
  ) {
    return this.model.deleteOne(filter, options as never);
  }

  async deleteMany(
    filter: RepositoryFilter,
    options?: Record<string, unknown>
  ) {
    return this.model.deleteMany(filter, options as never);
  }

  async exists(filter: RepositoryFilter): Promise<boolean> {
    const document = await this.model.exists(filter);
    return Boolean(document);
  }

  async count(filter: RepositoryFilter = {}): Promise<number> {
    return this.model.countDocuments(filter);
  }
}
