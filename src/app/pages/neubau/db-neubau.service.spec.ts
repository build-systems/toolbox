import { TestBed } from '@angular/core/testing';

import { DbNeubauService } from './db-neubau.service';

describe('DbNeubauService', () => {
  let service: DbNeubauService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbNeubauService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
