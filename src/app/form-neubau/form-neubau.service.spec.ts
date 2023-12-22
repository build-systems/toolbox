import { TestBed } from '@angular/core/testing';

import { FormNeubauService } from './form-neubau.service';

describe('FormNeubauService', () => {
  let service: FormNeubauService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormNeubauService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
