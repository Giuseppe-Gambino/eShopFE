import { iOrderItem } from './i-order-item';
import { iUser } from './i-user';

export interface iResellerOrder {
  id: number;
  reseller: iUser;
  orderItem: iOrderItem | null;
  createdAt: string;
  orderStatus: StatusResellerOrder;
}

export enum StatusResellerOrder {
  ORDINE_RICEVUTO = 'ORDINE_RICEVUTO',
  IN_ELABORAZIONE = 'IN_ELABORAZIONE',
  SPEDITO = 'SPEDITO',
  CONSEGNATO = 'CONSEGNATO',
}
