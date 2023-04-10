import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinfectionProportionGraphComponent } from './reinfection-proportion-graph.component';

describe('ReinfectionProportionGraphComponent', () => {
  let component: ReinfectionProportionGraphComponent;
  let fixture: ComponentFixture<ReinfectionProportionGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReinfectionProportionGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReinfectionProportionGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
