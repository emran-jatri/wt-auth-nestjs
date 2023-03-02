import { Injectable } from '@nestjs/common';
import { UserService } from '../../libs';
import { InitUserInput } from './dtos';

@Injectable()
export class LoginService {
  constructor(private readonly userService: UserService) {}

  initUser(initUserInput: InitUserInput) {
    return this.userService.init(initUserInput);
  }
}
