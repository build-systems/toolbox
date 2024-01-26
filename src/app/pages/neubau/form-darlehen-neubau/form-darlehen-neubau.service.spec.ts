import { TestBed } from '@angular/core/testing';

import { FormDarlehenNeubauService } from './form-darlehen-neubau.service';

describe('FormDarlehenNeubauService', () => {
  let service: FormDarlehenNeubauService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormDarlehenNeubauService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
