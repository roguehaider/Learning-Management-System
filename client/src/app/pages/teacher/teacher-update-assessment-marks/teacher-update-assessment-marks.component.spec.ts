import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherUpdateAssessmentMarksComponent } from './teacher-update-assessment-marks.component';

describe('TeacherUpdateAssessmentMarksComponent', () => {
  let component: TeacherUpdateAssessmentMarksComponent;
  let fixture: ComponentFixture<TeacherUpdateAssessmentMarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherUpdateAssessmentMarksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherUpdateAssessmentMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
