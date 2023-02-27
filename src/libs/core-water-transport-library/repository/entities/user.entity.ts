import { Types } from 'mongoose';

export class UserEntity {
  _id?: Types.ObjectId;
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
  commissionType: string; // enum
  userType: string; //
  createdBy: UserEntity;
  status?: boolean;
}
