import { TestBed, inject } from '@angular/core/testing';

import { MeasurementsTableService } from './measurements-table.service';

describe('MeasurementsTableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeasurementsTableService]
    });
  });

  it('should be created', inject([MeasurementsTableService], (service: MeasurementsTableService) => {
    expect(service).toBeTruthy();
  }));
});
