import { registerEnumType } from '@nestjs/graphql';
import { PermissionEnum } from '../../libs';
export { PermissionEnum } from '../../libs';

registerEnumType(PermissionEnum, {
  name: 'PermissionEnum',
});
