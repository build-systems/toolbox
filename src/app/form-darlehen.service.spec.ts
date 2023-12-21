import { TestBed } from '@angular/core/testing';

import { FormDarlehenService } from './form-darlehen.service';

describe('FormDarlehenService', () => {
  let service: FormDarlehenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormDarlehenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
