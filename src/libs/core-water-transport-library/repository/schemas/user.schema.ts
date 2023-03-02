import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import {
  CommissionTypeEnum,
  PermissionEnum,
  PrinterTypeEnum,
  PrintingTypeEnum,
  RoleEnum,
} from '../../common';
import { UserEntity } from '../entities';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({ type: String, trim: true })
  company: string;

  @Prop([{ type: String, trim: true }])
  multipleCompany: string[];

  @Prop({ type: String, trim: true })
  counter: string;

  @Prop([{ type: String, trim: true }])
  ships: string[];

  @Prop({ type: String, trim: true, required: true })
  name: string;

  @Prop({ type: String, trim: true })
  designation: string;

  @Prop({ type: String, trim: true, required: true, unique: true })
  phone: string;

  @Prop({ type: String, trim: true })
  email: string;

  @Prop({ type: String, trim: true, required: true })
  password: string;

  @Prop({ type: String, trim: true })
  nid: string;

  @Prop({ type: String, trim: true })
  address: string;

  @Prop({ type: String, trim: true })
  transactionType: string;

  @Prop({ type: Number, default: 0 })
  balance: number;

  @Prop({ type: Number, default: 0 })
  commission: number;

  @Prop({ type: String, enum: CommissionTypeEnum })
  commissionType: CommissionTypeEnum;

  @Prop({ type: String, enum: PrinterTypeEnum })
  printerType: PrinterTypeEnum;

  @Prop({ type: String, enum: PrintingTypeEnum })
  printingType: PrintingTypeEnum;

  @Prop({ type: String, enum: RoleEnum })
  role: RoleEnum;

  @Prop([{ type: String, enum: PermissionEnum }])
  permissions: PermissionEnum[];

  @Prop({ type: Number, default: 0 })
  reportPrintLimit: number;

  @Prop({ type: Boolean, default: false })
  alreadyLogin: boolean;

  @Prop({ type: String, trim: true })
  deviceToken: string;

  @Prop({ type: Boolean, default: false })
  resetToken: boolean;

  @Prop({ type: Boolean, default: false })
  cabinmanReserveConfirm: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: UserEntity;

  @Prop({ type: Boolean, required: true })
  status: boolean;
}

const schema = SchemaFactory.createForClass(User);
export const UserSchema = schema;
