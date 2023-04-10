import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SymptomsPiechartComponent } from './symptoms-piechart.component';

describe('SymptomsPiechartComponent', () => {
  let component: SymptomsPiechartComponent;
  let fixture: ComponentFixture<SymptomsPiechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SymptomsPiechartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SymptomsPiechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
