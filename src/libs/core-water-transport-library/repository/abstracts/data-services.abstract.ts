import { UserEntity } from '../entities';
import { GenericRepository } from './generic-repository.abstract';

export abstract class WaterTransportCoreDataServices {
  abstract users: GenericRepository<UserEntity>;
}
