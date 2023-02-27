import { Injectable } from '@nestjs/common';
import { WaterTransportCoreDataServices } from '../../repository';
import { UserCreateDto } from './dtos';

@Injectable()
export class UserService {
  constructor(
    private readonly waterTransportCoreDataServices: WaterTransportCoreDataServices,
  ) {}

  create(userCreateDto: UserCreateDto) {
    return this.waterTransportCoreDataServices.users.createOne(userCreateDto);
  }

  update() {
    return 'user create';
  }
}
