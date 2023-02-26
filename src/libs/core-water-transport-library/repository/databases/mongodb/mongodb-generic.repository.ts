import { PopulateOptions, PaginateModel, Model } from 'mongoose';
import { GenericRepository } from '../../abstracts';

export class MongoDBGenericRepository<T> implements GenericRepository<T> {
  private _repository: Model<T>;
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

  findOne(id: any, filterQuery?: object): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  findMany(filterQuery?: object): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  findManyWithPaginate(
    page: any,
    limit: any,
    filterQuery?: object,
  ): Promise<T> {
    throw new Error('Method not implemented.');
  }
  createOne(item: T): Promise<T> {
    throw new Error('Method not implemented.');
  }
  createMany(items: T[]): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  updateOne(
    id: any,
    partialData: Partial<T>,
    filterQuery?: object,
  ): Promise<T> {
    throw new Error('Method not implemented.');
  }
  updateMany(partialData: T[], filterQuery?: object): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  deleteOne(id: any, filterQuery?: object): Promise<T> {
    throw new Error('Method not implemented.');
  }
  deleteMany(filterQuery?: object): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  aggregation(): Promise<object> {
    throw new Error('Method not implemented.');
  }
}
