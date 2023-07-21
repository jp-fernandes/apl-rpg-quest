import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentPerformanceDetailsComponent } from './current-performance-details.component';

describe('CurrentPerformanceDetailsComponent', () => {
  let component: CurrentPerformanceDetailsComponent;
  let fixture: ComponentFixture<CurrentPerformanceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentPerformanceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentPerformanceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
