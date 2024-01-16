import { TestBed } from '@angular/core/testing';

import { FormProjektSanService } from './form-projekt-san.service';

describe('FormProjektSanService', () => {
  let service: FormProjektSanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormProjektSanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
