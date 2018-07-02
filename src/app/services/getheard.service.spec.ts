import { TestBed, inject } from '@angular/core/testing';

import { GetheardService } from './getheard.service';

describe('GetheardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetheardService]
    });
  });

  it('should be created', inject([GetheardService], (service: GetheardService) => {
    expect(service).toBeTruthy();
  }));
});
