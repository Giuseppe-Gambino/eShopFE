import { iProduct } from './i-product';

export interface ICartItem {
  id: number;
  product: iProduct;
  quantity: number;
}
