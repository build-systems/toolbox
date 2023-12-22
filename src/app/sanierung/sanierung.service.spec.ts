import { TestBed } from '@angular/core/testing';

import { SanierungService } from './sanierung.service';

describe('SanierungService', () => {
  let service: SanierungService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SanierungService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
