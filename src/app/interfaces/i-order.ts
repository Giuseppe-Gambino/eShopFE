import { iOrderItem } from './i-order-item';
import { iUser } from './i-user';

export interface iOrder {
  id: number;
  appUser: iUser;
  total: number;
  status: StatusOrder;
  createdAt: string;
  orderItems: iOrderItem[];
  stripeSessionId: string;
}

export enum StatusOrder {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
}
