import { TestBed } from '@angular/core/testing';

import { ChartsSettingsService } from './charts-settings.service';

describe('ChartsSettingsService', () => {
  let service: ChartsSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartsSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
