import { TestBed } from '@angular/core/testing';

import { DbEinzelmassnahmenService } from './db-einzelmassnahmen.service';

describe('DbEinzelmassnahmenService', () => {
  let service: DbEinzelmassnahmenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbEinzelmassnahmenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
