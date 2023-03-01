/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PaginateModel, PopulateOptions } from 'mongoose';
import { GenericRepository } from '../../abstracts';
import { MongoDBQueryOptions } from './../../../common';

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

  findOne(queryOptions: Partial<MongoDBQueryOptions<T>> = {}): Promise<T> {
    const { filter, projection, options } = queryOptions;
    const query = this._repository.findOne(filter, projection, options);
    // @ts-ignore
    return Promise.resolve(query.lean());
  }

  findOneById(
    id: any,
    queryOptions: Partial<MongoDBQueryOptions<T>> = {},
  ): Promise<T> {
    const { filter, projection, options } = queryOptions;
    const query = this._repository.findOne(
      { ...filter, _id: id },
      projection,
      options,
    );
    // @ts-ignore
    return Promise.resolve(query.lean());
  }
  findMany(queryOptions: Partial<MongoDBQueryOptions<T>> = {}): Promise<T[]> {
    const { filter, projection, options } = queryOptions;
    const query = this._repository.find(filter, projection, options);
    // @ts-ignore
    return Promise.resolve(query.lean());
  }
  findManyWithPaginate(
    page: number,
    limit: number,
    queryOptions: Partial<MongoDBQueryOptions<T>> = {},
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
    return this._repository.create(item);
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
    queryOptions: Partial<MongoDBQueryOptions<T>> = {},
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
    queryOptions: Partial<MongoDBQueryOptions<T>> = {},
  ): Promise<T[]> {
    const { filter, options } = queryOptions;
    const query = this._repository.updateMany(filter, partialData, options);
    // @ts-ignore
    return Promise.resolve(query);
  }
  deleteOne(
    id: any,
    queryOptions: Partial<MongoDBQueryOptions<T>> = {},
  ): Promise<T> {
    const { filter, options } = queryOptions;
    const query = this._repository.findOneAndDelete(
      { ...filter, _id: id },
      options,
    );
    // @ts-ignore
    return Promise.resolve(query);
  }
  deleteMany(queryOptions: Partial<MongoDBQueryOptions<T>> = {}): Promise<T[]> {
    const { filter, options } = queryOptions;
    const query = this._repository.deleteMany(filter, options);
    // @ts-ignore
    return Promise.resolve(query);
  }
  aggregation(
    queryOptions: Partial<MongoDBQueryOptions<T>> = {},
  ): Promise<any> {
    const { pipeline, aggregateOptions } = queryOptions;
    const query = this._repository.aggregate(pipeline, aggregateOptions);
    // @ts-ignore
    return Promise.resolve(query);
  }
}
