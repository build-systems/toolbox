import { TestBed } from '@angular/core/testing';

import { FormProjektService } from './form-projekt.service';

describe('FormProjektService', () => {
  let service: FormProjektService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormProjektService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
