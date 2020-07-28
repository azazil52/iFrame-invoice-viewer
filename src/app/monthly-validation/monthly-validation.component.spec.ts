import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyValidationComponent } from './monthly-validation.component';

describe('MonthlyValidationComponent', () => {
  let component: MonthlyValidationComponent;
  let fixture: ComponentFixture<MonthlyValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
