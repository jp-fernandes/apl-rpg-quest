import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentPerformanceComponent } from './current-performance.component';

describe('CurrentPerformanceComponent', () => {
  let component: CurrentPerformanceComponent;
  let fixture: ComponentFixture<CurrentPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentPerformanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
