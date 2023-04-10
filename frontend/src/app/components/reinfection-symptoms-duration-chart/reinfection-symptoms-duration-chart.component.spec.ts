import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinfectionSymptomsDurationChartComponent } from './reinfection-symptoms-duration-chart.component';

describe('ReinfectionSymptomsDurationChartComponent', () => {
  let component: ReinfectionSymptomsDurationChartComponent;
  let fixture: ComponentFixture<ReinfectionSymptomsDurationChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReinfectionSymptomsDurationChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReinfectionSymptomsDurationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
