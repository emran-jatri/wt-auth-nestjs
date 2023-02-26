import { Types } from 'mongoose';

export class UserEntity {
  _id?: Types.ObjectId;
  name: string;
  phone: string;
  password: string;
  email: string;
  createdBy: UserEntity;
  status?: boolean;
}
