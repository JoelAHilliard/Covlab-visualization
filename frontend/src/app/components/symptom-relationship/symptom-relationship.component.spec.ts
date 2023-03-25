import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymptomRelationshipComponent } from './symptom-relationship.component';

describe('SymptomRelationshipComponent', () => {
  let component: SymptomRelationshipComponent;
  let fixture: ComponentFixture<SymptomRelationshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SymptomRelationshipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SymptomRelationshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
