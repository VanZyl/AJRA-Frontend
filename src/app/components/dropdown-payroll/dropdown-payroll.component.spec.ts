import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownPayrollComponent } from './dropdown-payroll.component';

describe('DropdownPayrollComponent', () => {
  let component: DropdownPayrollComponent;
  let fixture: ComponentFixture<DropdownPayrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownPayrollComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownPayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
