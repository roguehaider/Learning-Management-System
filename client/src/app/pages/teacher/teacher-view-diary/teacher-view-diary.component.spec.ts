import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherViewDiaryComponent } from './teacher-view-diary.component';

describe('TeacherViewDiaryComponent', () => {
  let component: TeacherViewDiaryComponent;
  let fixture: ComponentFixture<TeacherViewDiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherViewDiaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherViewDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
