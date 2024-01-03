import { TestBed } from '@angular/core/testing';

import { CalendarRTAIService } from './calendar-rtai.service';

describe('CalendarRTAIService', () => {
  let service: CalendarRTAIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarRTAIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
