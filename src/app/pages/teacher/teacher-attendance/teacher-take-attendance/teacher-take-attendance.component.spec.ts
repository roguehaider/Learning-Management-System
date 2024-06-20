import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherTakeAttendanceComponent } from './teacher-take-attendance.component';

describe('TeacherTakeAttendanceComponent', () => {
  let component: TeacherTakeAttendanceComponent;
  let fixture: ComponentFixture<TeacherTakeAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherTakeAttendanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherTakeAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
