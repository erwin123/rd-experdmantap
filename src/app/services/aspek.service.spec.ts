import { TestBed, inject } from '@angular/core/testing';

import { AspekService } from './aspek.service';

describe('AspekService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AspekService]
    });
  });

  it('should be created', inject([AspekService], (service: AspekService) => {
    expect(service).toBeTruthy();
  }));
});
