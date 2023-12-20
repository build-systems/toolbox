import { TestBed } from '@angular/core/testing';

import { NeubauService } from './neubau.service';

describe('NeubauService', () => {
  let service: NeubauService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NeubauService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
