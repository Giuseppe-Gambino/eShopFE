import { ICartItem } from './i-cart-item';
import { iUser } from './i-user';
export interface ICart {
  id: number;
  user: iUser;
  orderItem: ICartItem[];
}
