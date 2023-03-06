import { Injectable } from '@nestjs/common';
import { WaterTransportCoreDataServices } from '../../repository';
import { InitUserCreateDto, UserCreateDto, UserUpdateDto } from './dtos';
import {
  CommissionTypeEnum,
  PermissionEnum,
  PrinterTypeEnum,
  PrintingTypeEnum,
  RoleEnum,
} from '../../common';
import * as argon2 from 'argon2';
import { ValidArgs, ValidateArgs } from '../../common/decorators';

@Injectable()
export class UserService {
  constructor(
    private readonly waterTransportCoreDataServices: WaterTransportCoreDataServices,
  ) {}

  @ValidateArgs()
  async init(
    @ValidArgs(InitUserCreateDto) initUserCreateDto: InitUserCreateDto,
  ) {
    const password = await argon2.hash(initUserCreateDto.password);

    return this.waterTransportCoreDataServices.users.createOne({
      ...initUserCreateDto,
      password,
      company: '',
      multipleCompany: [],
      counter: '',
      ships: [],
      transactionType: '',
      balance: 0,
      commission: 0,
      commissionType: CommissionTypeEnum.FIXED,
      printerType: PrinterTypeEnum.BLUETOOTH,
      printingType: PrintingTypeEnum.INDIVIDUAL,
      reportPrintLimit: 0,
      role: RoleEnum.ADMIN,
      alreadyLogin: false,
      deviceToken: '',
      resetToken: true,
      cabinmanReserveConfirm: false,
      permissions: Object.values(PermissionEnum),
      createdBy: null,
      status: true,
    });
  }

  @ValidateArgs()
  async create(@ValidArgs(UserCreateDto) userCreateDto: UserCreateDto) {
    const password = await argon2.hash(userCreateDto.password);
    return this.waterTransportCoreDataServices.users.createOne({
      ...userCreateDto,
      password,
      company: '',
      multipleCompany: [],
      counter: '',
      ships: [],
      transactionType: '',
      balance: 0,
      commission: 0,
      commissionType: CommissionTypeEnum.FIXED,
      printerType: PrinterTypeEnum.BLUETOOTH,
      printingType: PrintingTypeEnum.INDIVIDUAL,
      reportPrintLimit: 0,
      role: RoleEnum.ADMIN,
      alreadyLogin: false,
      deviceToken: '',
      resetToken: true,
      cabinmanReserveConfirm: false,
      permissions: Object.values(PermissionEnum),
      createdBy: null,
      status: true,
    });
  }

  @ValidateArgs()
  async update(
    id: string,
    @ValidArgs(UserUpdateDto) userUpdateDto: UserUpdateDto,
  ) {
    const { _id, ...updateData } = userUpdateDto;

    if (updateData.password) {
      updateData.password = await argon2.hash(updateData.password);
    }
    return this.waterTransportCoreDataServices.users.updateOne(id, updateData);
  }
}
