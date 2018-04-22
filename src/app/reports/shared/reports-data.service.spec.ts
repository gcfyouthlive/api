import { TestBed, inject } from '@angular/core/testing';

import { ReportsDataService } from './reports-data.service';

describe('ReportsDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportsDataService]
    });
  });

  it('should be created', inject([ReportsDataService], (service: ReportsDataService) => {
    expect(service).toBeTruthy();
  }));
});
