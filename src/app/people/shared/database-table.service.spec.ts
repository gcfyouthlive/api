import { TestBed, inject } from '@angular/core/testing';

import { DatabaseTableService } from './database-table.service';

describe('DatabaseTableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatabaseTableService]
    });
  });

  it('should be created', inject([DatabaseTableService], (service: DatabaseTableService) => {
    expect(service).toBeTruthy();
  }));
});
