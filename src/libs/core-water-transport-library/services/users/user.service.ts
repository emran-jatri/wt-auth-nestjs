import { Injectable } from '@nestjs/common';
import { WaterTransportCoreDataServices } from '../../repository';
import { InitUserCreateDto } from './dtos';
import {
  CommissionTypeEnum,
  PermissionEnum,
  PrinterTypeEnum,
  PrintingTypeEnum,
  RoleEnum,
} from '../../common';
import * as argon2 from 'argon2';
import { ShouldValidate, ValidateArgs } from '../../common/decorators';

@Injectable()
export class UserService {
  constructor(
    private readonly waterTransportCoreDataServices: WaterTransportCoreDataServices,
  ) {}

  @ValidateArgs()
  async init(
    @ShouldValidate(InitUserCreateDto) initUserCreateDto: InitUserCreateDto,
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

  async create(initUserCreateDto: InitUserCreateDto) {
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

  update() {
    return 'user create';
  }
}
