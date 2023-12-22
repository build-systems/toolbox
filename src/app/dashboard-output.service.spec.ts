import { TestBed } from '@angular/core/testing';

import { DashboardOutputService } from './dashboard-output.service';

describe('DashboardOutputService', () => {
  let service: DashboardOutputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardOutputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
