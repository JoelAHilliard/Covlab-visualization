import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSymtpomsPieChartComponent } from './all-symtpoms-pie-chart.component';

describe('AllSymtpomsPieChartComponent', () => {
  let component: AllSymtpomsPieChartComponent;
  let fixture: ComponentFixture<AllSymtpomsPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSymtpomsPieChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSymtpomsPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
