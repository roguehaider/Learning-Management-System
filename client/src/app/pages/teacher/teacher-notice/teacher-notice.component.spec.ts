import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherNoticeComponent } from './teacher-notice.component';

describe('TeacherNoticeComponent', () => {
  let component: TeacherNoticeComponent;
  let fixture: ComponentFixture<TeacherNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherNoticeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
