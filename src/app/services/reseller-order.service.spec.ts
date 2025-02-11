import { TestBed } from '@angular/core/testing';

import { ResellerOrderService } from './reseller-order.service';

describe('ResellerOrderService', () => {
  let service: ResellerOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResellerOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
