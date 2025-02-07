import { iCartItem } from './i-cart-item';
import { iUser } from './i-user';

export interface iCart {
  id: number;
  user: iUser;
  cartItems: iCartItem[];
}
