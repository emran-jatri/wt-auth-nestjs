import { UserEntity } from '../../../repository';
import {
  CommissionTypeEnum,
  PrinterTypeEnum,
  PrintingTypeEnum,
  RoleEnum,
  PermissionEnum,
} from '../../../common';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserCreateDto {
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
  commissionType: CommissionTypeEnum;
  // userType: UserTypeEnum;

  @IsEnum(CommissionTypeEnum)
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

  @IsEnum(RoleEnum)
  @IsString()
  permissions: PermissionEnum[];

  @IsOptional()
  createdBy: UserEntity;
}
