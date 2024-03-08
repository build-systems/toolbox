import { TestBed } from '@angular/core/testing';

import { DatengrundlageService } from './datengrundlage.service';

describe('DatengrundlageService', () => {
  let service: DatengrundlageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatengrundlageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
