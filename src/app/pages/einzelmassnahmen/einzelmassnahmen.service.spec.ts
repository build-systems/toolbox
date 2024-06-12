import { TestBed } from '@angular/core/testing';

import { EinzelmassnahmenService } from './einzelmassnahmen.service';

describe('EinzelmassnahmenService', () => {
  let service: EinzelmassnahmenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EinzelmassnahmenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
