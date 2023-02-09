import { TestBed } from '@angular/core/testing';

import { PieChartService } from './pie-chart.service';

describe('CovidTrackingService', () => {
  let service: PieChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PieChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
