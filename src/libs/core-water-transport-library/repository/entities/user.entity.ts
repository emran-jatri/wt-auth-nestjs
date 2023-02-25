export interface UserEntity {
  _id?: string;
  name: string;
  phone: string;
  password: string;
  email: string;
  createdBy: UserEntity;
  status?: boolean;
}
