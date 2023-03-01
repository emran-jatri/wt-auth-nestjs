import { MongoDBQueryOptions } from '../../common';

export abstract class GenericRepository<T> {
  abstract findOne(queryOptions?: Partial<MongoDBQueryOptions<T>>): Promise<T>;
  abstract findOneById(
    id,
    queryOptions?: Partial<MongoDBQueryOptions<T>>,
  ): Promise<T>;
  abstract findMany(
    queryOptions?: Partial<MongoDBQueryOptions<T>>,
  ): Promise<T[]>;
  abstract findManyWithPaginate(
    page: number,
    limit: number,
    queryOptions?: Partial<MongoDBQueryOptions<T>>,
  ): Promise<T[]>;

  abstract createOne(item: T): Promise<T>;
  abstract createMany(items: T[]): Promise<T[]>;

  abstract updateOne(
    id,
    partialData: Partial<T>,
    queryOptions?: Partial<MongoDBQueryOptions<T>>,
  ): Promise<T>;

  abstract updateMany(
    partialData: Partial<T[]>,
    queryOptions?: Partial<MongoDBQueryOptions<T>>,
  ): Promise<T[]>;

  abstract deleteOne(
    id,
    queryOptions?: Partial<MongoDBQueryOptions<T>>,
  ): Promise<T>;
  abstract deleteMany(
    queryOptions?: Partial<MongoDBQueryOptions<T>>,
  ): Promise<T[]>;

  abstract aggregation(
    queryOptions?: Partial<MongoDBQueryOptions<T>>,
  ): Promise<any>;
}
