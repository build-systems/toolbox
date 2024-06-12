import { TestBed } from '@angular/core/testing';

import { FormEinzelmassnahmenService } from './form-einzelmassnahmen.service';

describe('FormEinzelmassnahmenService', () => {
  let service: FormEinzelmassnahmenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormEinzelmassnahmenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
