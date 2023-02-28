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

@Injectable()
export class UserService {
  constructor(
    private readonly waterTransportCoreDataServices: WaterTransportCoreDataServices,
  ) {}

  create(initUserCreateDto: InitUserCreateDto) {
    return this.waterTransportCoreDataServices.users.createOne({
      ...initUserCreateDto,
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
