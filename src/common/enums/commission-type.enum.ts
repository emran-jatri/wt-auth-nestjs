import { registerEnumType } from '@nestjs/graphql';
import { CommissionTypeEnum } from '../../libs';

// export enum CommissionTypeEnum {
//   FIXED = 'FIXED',
//   PERCENTAGE = 'PERCENTAGE',
// }

registerEnumType(CommissionTypeEnum, {
  name: 'CommissionTypeEnum',
});
