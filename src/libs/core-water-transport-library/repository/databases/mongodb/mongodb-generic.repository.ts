/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  AggregateOptions,
  FilterQuery,
  InsertManyOptions,
  PaginateModel,
  PaginateOptions,
  PipelineStage,
  PopulateOptions,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import { GenericRepository } from '../../abstracts';

interface DefaultOptions<T> {
  filter: FilterQuery<T>;
  projection: ProjectionType<T> | null | undefined;
  options: QueryOptions<T> | null | undefined;
  paginateOptions: PaginateOptions;
  InsertManyOptions: InsertManyOptions;
  update: UpdateQuery<T> | UpdateWithAggregationPipeline;
  pipeline: PipelineStage[];
  aggregateOptions: AggregateOptions;
}

export class MongoDBGenericRepository<T> implements GenericRepository<T> {
  private _repository: PaginateModel<T>;
  private readonly _populateOnFind:
    | PopulateOptions
    | PopulateOptions[]
    | string
    | string[]
    | undefined;

  constructor(
    repository: PaginateModel<T>,
    populateOnFind:
      | PopulateOptions
      | PopulateOptions[]
      | string
      | string[]
      | undefined = [],
  ) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }

  findOne(id: any, queryOptions: Partial<DefaultOptions<T>> = {}): Promise<T> {
    const { filter, projection, options } = queryOptions;
    const query = this._repository.findOne(
      { ...filter, _id: id },
      projection,
      options,
    );
    // @ts-ignore
    return Promise.resolve(query.lean());
  }
  findMany(queryOptions: Partial<DefaultOptions<T>> = {}): Promise<T[]> {
    const { filter, projection, options } = queryOptions;
    const query = this._repository.find(filter, projection, options);
    // @ts-ignore
    return Promise.resolve(query.lean());
  }
  findManyWithPaginate(
    page: number,
    limit: number,
    queryOptions: Partial<DefaultOptions<T>> = {},
  ): Promise<T[]> {
    const { filter, paginateOptions } = queryOptions;
    const query = this._repository.paginate(filter, {
      ...paginateOptions,
      page,
      limit,
    });
    // @ts-ignore
    return Promise.resolve(query.lean());
  }
  createOne(item: T): Promise<T> {
    // const query = this._repository.create(item);
    let query = new this._repository(item).save();

    // @ts-ignore
    query = query.populate(this._populateOnFind);
    // @ts-ignore
    return Promise.resolve(query.lean());
  }
  createMany(items: T[]): Promise<T[]> {
    const query = this._repository.insertMany(items, {
      populate: this._populateOnFind,
    });
    // @ts-ignore
    return Promise.resolve(query);
  }
  updateOne(
    id: any,
    partialData: Partial<T>,
    queryOptions: Partial<DefaultOptions<T>> = {},
  ): Promise<T> {
    const { filter, options } = queryOptions;
    const query = this._repository.findOneAndUpdate(
      { ...filter, _id: id },
      partialData,
      options,
    );
    // @ts-ignore
    return Promise.resolve(query);
  }
  updateMany(
    partialData: T[],
    queryOptions: Partial<DefaultOptions<T>> = {},
  ): Promise<T[]> {
    const { filter, options } = queryOptions;
    const query = this._repository.updateMany(filter, partialData, options);
    // @ts-ignore
    return Promise.resolve(query);
  }
  deleteOne(
    id: any,
    queryOptions: Partial<DefaultOptions<T>> = {},
  ): Promise<T> {
    const { filter, options } = queryOptions;
    const query = this._repository.findOneAndDelete(
      { ...filter, _id: id },
      options,
    );
    // @ts-ignore
    return Promise.resolve(query);
  }
  deleteMany(queryOptions: Partial<DefaultOptions<T>> = {}): Promise<T[]> {
    const { filter, options } = queryOptions;
    const query = this._repository.deleteMany(filter, options);
    // @ts-ignore
    return Promise.resolve(query);
  }
  aggregation(queryOptions: Partial<DefaultOptions<T>> = {}): Promise<any> {
    const { pipeline, aggregateOptions } = queryOptions;
    const query = this._repository.aggregate(pipeline, aggregateOptions);
    // @ts-ignore
    return Promise.resolve(query);
  }
}
