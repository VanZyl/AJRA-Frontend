import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeepersonalinformationComponent } from './employeepersonalinformation.component';

describe('EmployeepersonalinformationComponent', () => {
  let component: EmployeepersonalinformationComponent;
  let fixture: ComponentFixture<EmployeepersonalinformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeepersonalinformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeepersonalinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
