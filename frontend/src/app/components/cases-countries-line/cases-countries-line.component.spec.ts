import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesCountries } from './cases-countries-line';

describe('CasesCountries', () => {
  let component: CasesCountries;
  let fixture: ComponentFixture<CasesCountries>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasesCountries ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CasesCountries);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
