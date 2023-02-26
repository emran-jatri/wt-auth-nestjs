import { UserEntity } from '../entities';
import { GenericRepository } from './generic-repository.abstract';

export abstract class WaterTransportCoreTransactionDataServices {
  abstract users: GenericRepository<UserEntity>;
}
