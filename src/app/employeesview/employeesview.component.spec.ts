import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesviewComponent } from './employeesview.component';

describe('EmployeesviewComponent', () => {
  let component: EmployeesviewComponent;
  let fixture: ComponentFixture<EmployeesviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeesviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeesviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
