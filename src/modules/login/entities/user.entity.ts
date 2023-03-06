import { ObjectType } from '@nestjs/graphql';
import {
  CommissionTypeEnum,
  PermissionEnum,
  PrinterTypeEnum,
  PrintingTypeEnum,
  RoleEnum,
} from '../../../common';

@ObjectType()
export class User {
  _id: string;
  company: string;
  multipleCompany: string[];
  counter: string;
  ships: string[];
  name: string;
  designation: string;
  phone: string;
  email: string;
  nid: string;
  address: string;
  transactionType: string;
  balance: number;
  commission: number;
  commissionType: CommissionTypeEnum;
  printerType: PrinterTypeEnum;
  printingType: PrintingTypeEnum;
  reportPrintLimit: number;
  role: RoleEnum;
  alreadyLogin: boolean;
  deviceToken: string;
  resetToken: boolean;
  cabinmanReserveConfirm: boolean;
  permissions: PermissionEnum[];
  createdBy?: User;
  status: boolean;
}
