import { TestBed } from '@angular/core/testing';

import { FormProjektSanierungService } from './form-projekt-sanierung.service';

describe('FormProjektSanierungService', () => {
  let service: FormProjektSanierungService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormProjektSanierungService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
