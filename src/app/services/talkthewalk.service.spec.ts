import { TestBed, inject } from '@angular/core/testing';

import { TalkthewalkService } from './talkthewalk.service';

describe('TalkthewalkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TalkthewalkService]
    });
  });

  it('should be created', inject([TalkthewalkService], (service: TalkthewalkService) => {
    expect(service).toBeTruthy();
  }));
});
