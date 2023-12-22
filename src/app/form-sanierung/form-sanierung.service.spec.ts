import { TestBed } from '@angular/core/testing';

import { FormSanierungService } from './form-sanierung.service';

describe('FormSanierungService', () => {
  let service: FormSanierungService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormSanierungService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
