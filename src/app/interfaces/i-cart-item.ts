import { iProduct } from './i-product';

export interface iCartItem {
  id: number;
  product: iProduct;
  quantity: number;
}
