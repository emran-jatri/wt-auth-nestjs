import { registerEnumType } from '@nestjs/graphql';
import { PermissionEnum } from '../../libs';

registerEnumType(PermissionEnum, {
  name: 'PermissionEnum',
});
