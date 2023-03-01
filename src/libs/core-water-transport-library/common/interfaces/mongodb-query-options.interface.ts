import {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  PaginateOptions,
  InsertManyOptions,
  UpdateWithAggregationPipeline,
  UpdateQuery,
  PipelineStage,
  AggregateOptions,
} from 'mongoose';

export interface MongoDBQueryOptions<T> {
  filter: FilterQuery<T>;
  projection: ProjectionType<T> | null | undefined;
  options: QueryOptions<T> | null | undefined;
  paginateOptions: PaginateOptions;
  InsertManyOptions: InsertManyOptions;
  update: UpdateQuery<T> | UpdateWithAggregationPipeline;
  pipeline: PipelineStage[];
  aggregateOptions: AggregateOptions;
}
