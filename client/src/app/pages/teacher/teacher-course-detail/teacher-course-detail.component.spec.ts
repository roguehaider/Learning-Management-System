import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCourseDetailComponent } from './teacher-course-detail.component';

describe('TeacherCourseDetailComponent', () => {
  let component: TeacherCourseDetailComponent;
  let fixture: ComponentFixture<TeacherCourseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherCourseDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherCourseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
