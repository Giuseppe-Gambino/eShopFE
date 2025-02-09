import { iOrder } from './i-order';
import { iProduct } from './i-product';

export interface iOrderItem {
  id: number;
  order: iOrder;
  product: iProduct;
  quantity: number;
  price: number;
}
