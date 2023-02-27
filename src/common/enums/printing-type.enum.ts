import { registerEnumType } from '@nestjs/graphql';
import { PrintingTypeEnum } from '../../libs';

registerEnumType(PrintingTypeEnum, {
  name: 'PrintingTypeEnum',
});
