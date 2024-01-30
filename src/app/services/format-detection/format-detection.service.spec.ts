import { TestBed } from '@angular/core/testing';

import { FormatDetectionService } from './format-detection.service';

describe('FormatDetectionService', () => {
  let service: FormatDetectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatDetectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
