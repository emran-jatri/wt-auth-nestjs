import { registerEnumType } from '@nestjs/graphql';
import { RoleEnum } from '../../libs';
export { RoleEnum } from '../../libs';

registerEnumType(RoleEnum, {
  name: 'RoleEnum',
});
