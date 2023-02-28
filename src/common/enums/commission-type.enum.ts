import { registerEnumType } from '@nestjs/graphql';
import { CommissionTypeEnum } from '../../libs';
export { CommissionTypeEnum } from '../../libs';

registerEnumType(CommissionTypeEnum, {
  name: 'CommissionTypeEnum',
});
