import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGiveRemarksComponent } from './student-give-remarks.component';

describe('StudentGiveRemarksComponent', () => {
  let component: StudentGiveRemarksComponent;
  let fixture: ComponentFixture<StudentGiveRemarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentGiveRemarksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentGiveRemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
