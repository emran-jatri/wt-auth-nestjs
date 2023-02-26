import { Injectable } from '@nestjs/common';
import { WaterTransportCoreDataServices } from '../../repository';

@Injectable()
export class UserService {
  constructor(
    private readonly waterTransportCoreDataServices: WaterTransportCoreDataServices,
  ) {}

  create() {
    return 'user create';
  }

  update() {
    return 'user create';
  }
}
