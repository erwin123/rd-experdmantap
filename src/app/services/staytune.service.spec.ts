import { TestBed, inject } from '@angular/core/testing';

import { StaytuneService } from './staytune.service';

describe('StaytuneService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StaytuneService]
    });
  });

  it('should be created', inject([StaytuneService], (service: StaytuneService) => {
    expect(service).toBeTruthy();
  }));
});
