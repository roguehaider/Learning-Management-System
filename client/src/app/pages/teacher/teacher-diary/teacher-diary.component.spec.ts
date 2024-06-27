import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDiaryComponent } from './teacher-diary.component';

describe('TeacherDiaryComponent', () => {
  let component: TeacherDiaryComponent;
  let fixture: ComponentFixture<TeacherDiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherDiaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
