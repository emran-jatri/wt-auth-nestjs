import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { WaterTransportCoreDataServices } from '../../abstracts';
import { User, UserDocument } from '../../schemas';
import { MongoDBGenericRepository } from './mongodb-generic.repository';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';

@Injectable()
export class MongoDBDataServices
  implements WaterTransportCoreDataServices, OnApplicationBootstrap
{
  users: MongoDBGenericRepository<UserDocument>;

  constructor(
    @InjectModel(User.name)
    private UserRepository: PaginateModel<UserDocument>,
  ) {}

  onApplicationBootstrap() {
    this.users = new MongoDBGenericRepository<UserDocument>(
      this.UserRepository,
      ['createdBy'],
    );
  }
}
