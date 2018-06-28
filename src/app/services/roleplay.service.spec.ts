import { TestBed, inject } from '@angular/core/testing';

import { RoleplayService } from './roleplay.service';

describe('RoleplayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleplayService]
    });
  });

  it('should be created', inject([RoleplayService], (service: RoleplayService) => {
    expect(service).toBeTruthy();
  }));
});
