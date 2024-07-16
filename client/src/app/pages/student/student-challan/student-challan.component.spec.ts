import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentChallanComponent } from './student-challan.component';

describe('StudentChallanComponent', () => {
  let component: StudentChallanComponent;
  let fixture: ComponentFixture<StudentChallanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentChallanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentChallanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
