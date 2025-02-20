import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeepayslipsDatabaseComponent } from './employeepayslips-database.component';

describe('EmployeepayslipsDatabaseComponent', () => {
  let component: EmployeepayslipsDatabaseComponent;
  let fixture: ComponentFixture<EmployeepayslipsDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeepayslipsDatabaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeepayslipsDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
