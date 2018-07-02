import { TestBed, inject } from '@angular/core/testing';

import { StdserviceService } from './stdservice.service';

describe('StdserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StdserviceService]
    });
  });

  it('should be created', inject([StdserviceService], (service: StdserviceService) => {
    expect(service).toBeTruthy();
  }));
});
