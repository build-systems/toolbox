import { TestBed } from '@angular/core/testing';

import { DbSanierungService } from './db-sanierung.service';

describe('DbSanierungService', () => {
  let service: DbSanierungService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbSanierungService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
