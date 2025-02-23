import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDeductionsComponent } from './employee-deductions.component';

describe('EmployeeDeductionsComponent', () => {
  let component: EmployeeDeductionsComponent;
  let fixture: ComponentFixture<EmployeeDeductionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeDeductionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeDeductionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
