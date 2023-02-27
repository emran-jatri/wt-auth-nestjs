import { Types } from 'mongoose';
import {
  CommissionTypeEnum,
  PermissionEnum,
  PrinterTypeEnum,
  PrintingTypeEnum,
  RoleEnum,
} from '../../common';

export class UserEntity {
  _id?: Types.ObjectId;
  company: string;
  multipleCompany: string[];
  counter: string;
  ships: string[];
  name: string;
  designation: string;
  phone: string;
  email: string;
  password: string;
  nid: string;
  address: string;
  transactionType: string;
  balance: number;
  commission: number;
  commissionType: CommissionTypeEnum;
  // userType: UserTypeEnum;
  printerType: PrinterTypeEnum;
  printingType: PrintingTypeEnum;
  reportPrintLimit: number;
  role: RoleEnum;
  alreadyLogin: boolean;
  deviceToken: string;
  resetToken: boolean;
  cabinmanReserveConfirm: boolean;
  permissions: PermissionEnum[];
  createdBy: UserEntity;
  status?: boolean;
}
