import { iProduct } from './i-product';
import { iResellerOrder } from './i-reseller-order';
import { iTicket } from './i-ticket';
import { iUser } from './i-user';

export interface iPageAble {
  content: iProduct[] | iResellerOrder[] | iTicket[] | iUser[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  empty: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}
