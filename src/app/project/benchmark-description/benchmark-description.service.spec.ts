import { TestBed, inject } from '@angular/core/testing';

import { BenchmarkDescriptionService } from './benchmark-description.service';

describe('BenchmarkDescriptionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BenchmarkDescriptionService]
    });
  });

  it('should be created', inject([BenchmarkDescriptionService], (service: BenchmarkDescriptionService) => {
    expect(service).toBeTruthy();
  }));
});
