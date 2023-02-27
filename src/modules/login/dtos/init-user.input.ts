import { Field, InputType, registerEnumType } from '@nestjs/graphql';
// import { CommissionTypeEnum } from '../../../common';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import {
  CommissionTypeEnum,
  PermissionEnum,
  PrinterTypeEnum,
  PrintingTypeEnum,
  RoleEnum,
} from '../../../libs';

// export enum CommissionTypeEnum {
//   FIXED = 'FIXED',
//   PERCENTAGE = 'PERCENTAGE',
// }

// registerEnumType(CommissionTypeEnum, {
//   name: 'CommissionTypeEnum',
// });

@InputType()
export class InitUserInput {
  @IsString()
  company: string;

  @IsString()
  multipleCompany: string[];

  @IsString()
  counter: string;

  @IsString()
  ships: string[];

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  designation: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  nid: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  transactionType: string;

  @IsNumber()
  balance: number;

  @IsNumber()
  commission: number;

  @IsEnum(CommissionTypeEnum)
  @IsString()
  @Field(() => CommissionTypeEnum)
  commissionType: CommissionTypeEnum;
  // userType: UserTypeEnum;

  @IsEnum(PrinterTypeEnum)
  @IsString()
  printerType: PrinterTypeEnum;

  @IsEnum(PrintingTypeEnum)
  @IsString()
  printingType: PrintingTypeEnum;

  @IsNumber()
  reportPrintLimit: number;

  @IsEnum(RoleEnum)
  @IsString()
  role: RoleEnum;

  @IsBoolean()
  alreadyLogin: boolean;

  @IsString()
  deviceToken: string;

  @IsBoolean()
  resetToken: boolean;

  @IsBoolean()
  cabinmanReserveConfirm: boolean;

  @IsEnum(PermissionEnum)
  @IsString()
  permissions: PermissionEnum[];
}
