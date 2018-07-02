import { TestBed, inject } from '@angular/core/testing';

import { WakeupcallService } from './wakeupcall.service';

describe('WakeupcallService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WakeupcallService]
    });
  });

  it('should be created', inject([WakeupcallService], (service: WakeupcallService) => {
    expect(service).toBeTruthy();
  }));
});
