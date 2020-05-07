import { TestBed } from '@angular/core/testing';

import { DialogPaymentService } from './dialog-payment.service';

describe('DialogPaymentService', () => {
  let service: DialogPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
