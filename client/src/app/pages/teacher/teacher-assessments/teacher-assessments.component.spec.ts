import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAssessmentsComponent } from './teacher-assessments.component';

describe('TeacherAssessmentsComponent', () => {
  let component: TeacherAssessmentsComponent;
  let fixture: ComponentFixture<TeacherAssessmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherAssessmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherAssessmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
