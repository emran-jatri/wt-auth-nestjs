import { ObjectType } from '@nestjs/graphql';
import { IsEnum, IsOptional } from 'class-validator';
import {
  CommissionTypeEnum,
  PermissionEnum,
  PrinterTypeEnum,
  PrintingTypeEnum,
  RoleEnum,
} from '../../../common';

@ObjectType()
export class User {
  _id?: string;
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

  @IsEnum(CommissionTypeEnum)
  commissionType: CommissionTypeEnum;

  @IsEnum(PrinterTypeEnum)
  printerType: PrinterTypeEnum;

  @IsEnum(PrintingTypeEnum)
  printingType: PrintingTypeEnum;

  reportPrintLimit: number;

  @IsEnum(RoleEnum)
  role: RoleEnum;

  alreadyLogin: boolean;
  deviceToken: string;
  resetToken: boolean;
  cabinmanReserveConfirm: boolean;

  @IsEnum(PermissionEnum)
  permissions: PermissionEnum[];

  createdBy?: User;
  status: boolean;
}
