import { Types } from 'mongoose';
import { UserEntity } from './';

export class CompanyEntity {
  _id?: Types.ObjectId;
  name: string;
  displayName: string;
  complainNumber: string;
  logo: string;
  maxSeatPerTicket: number;
  deckCommissionBase: string;
  deckCommissionRate: string;
  goodsCommissionBase: string;
  goodsCommissionRate: string;
  seatCommissionBase: string;
  seatCommissionRate: string;
  digitalTicketingCommissionBase: string;
  digitalTicketingCommissionRate: string;
  paymentGatewayRate: number;
  tag: string;
  reservation: boolean;
  createdBy: UserEntity;
  status?: boolean;
}
