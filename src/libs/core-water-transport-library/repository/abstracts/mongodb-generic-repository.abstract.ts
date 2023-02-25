export abstract class MongoDBGenericRepository<T> {
  abstract findAll(): Promise<T[]>;
  abstract findAllWithPaginate(): Promise<T>;
  abstract findOne(): Promise<T[]>;
  abstract create(): Promise<T>;
  abstract createMany(): Promise<T[]>;
  abstract update(): Promise<T>;
  abstract updateMany(): Promise<T[]>;
  abstract delete(): Promise<T>;
  abstract deleteMany(): Promise<T[]>;
}
