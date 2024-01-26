import { TestBed } from '@angular/core/testing';

import { FormDarlehenSanierungService } from './form-darlehen-sanierung.service';

describe('FormDarlehenSanierungService', () => {
  let service: FormDarlehenSanierungService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormDarlehenSanierungService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
