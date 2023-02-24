import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetLineComponent } from './tweet-line.component';

describe('TweetLineComponent', () => {
  let component: TweetLineComponent;
  let fixture: ComponentFixture<TweetLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TweetLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
