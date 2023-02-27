import { registerEnumType } from '@nestjs/graphql';
import { RoleEnum } from '../../libs';

registerEnumType(RoleEnum, {
  name: 'RoleEnum',
});
