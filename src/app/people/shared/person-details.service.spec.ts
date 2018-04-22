import { TestBed, inject } from '@angular/core/testing';

import { PersonDetailsService } from './person-details.service';

describe('PersonDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonDetailsService]
    });
  });

  it('should be created', inject([PersonDetailsService], (service: PersonDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
