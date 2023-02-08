import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableGraphComponent } from './table-graph.component';

describe('TableGraphComponent', () => {
  let component: TableGraphComponent;
  let fixture: ComponentFixture<TableGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
