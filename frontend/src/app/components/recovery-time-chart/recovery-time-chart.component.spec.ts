import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecoveryTimeChartComponent } from './recovery-time-chart.component';

describe('RecoveryTimeChartComponent', () => {
  let component: RecoveryTimeChartComponent;
  let fixture: ComponentFixture<RecoveryTimeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoveryTimeChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoveryTimeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
