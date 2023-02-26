export abstract class GenericRepository<T> {
  abstract findOne(id, filterQuery?: object): Promise<T[]>;
  abstract findMany(filterQuery?: object): Promise<T[]>;
  abstract findManyWithPaginate(page, limit, filterQuery?: object): Promise<T>;

  abstract createOne(item: T): Promise<T>;
  abstract createMany(items: T[]): Promise<T[]>;

  abstract updateOne(
    id,
    partialData: Partial<T>,
    filterQuery?: object,
  ): Promise<T>;

  abstract updateMany(
    partialData: Partial<T[]>,
    filterQuery?: object,
  ): Promise<T[]>;

  abstract deleteOne(id, filterQuery?: object): Promise<T>;
  abstract deleteMany(filterQuery?: object): Promise<T[]>;

  abstract aggregation(): Promise<object>;
}
