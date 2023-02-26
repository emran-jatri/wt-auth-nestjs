export abstract class GenericRepository<T> {
  abstract findOne(id, queryOptions?: object): Promise<T>;
  abstract findMany(queryOptions?: object): Promise<T[]>;
  abstract findManyWithPaginate(
    page: number,
    limit: number,
    queryOptions?: object,
  ): Promise<T[]>;

  abstract createOne(item: T): Promise<T>;
  abstract createMany(items: T[]): Promise<T[]>;

  abstract updateOne(
    id,
    partialData: Partial<T>,
    queryOptions?: object,
  ): Promise<T>;

  abstract updateMany(
    partialData: Partial<T[]>,
    queryOptions?: object,
  ): Promise<T[]>;

  abstract deleteOne(id, queryOptions?: object): Promise<T>;
  abstract deleteMany(queryOptions?: object): Promise<T[]>;

  abstract aggregation(queryOptions?: object): Promise<any>;
}
