import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeedataDatabaseComponent } from './employeedata-database.component';

describe('EmployeedataDatabaseComponent', () => {
  let component: EmployeedataDatabaseComponent;
  let fixture: ComponentFixture<EmployeedataDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeedataDatabaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeedataDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
