import { registerEnumType } from '@nestjs/graphql';
import { PrinterTypeEnum } from '../../libs';
export { PrinterTypeEnum } from '../../libs';

registerEnumType(PrinterTypeEnum, {
  name: 'PrinterTypeEnum',
});
