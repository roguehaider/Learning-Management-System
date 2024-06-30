import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCourseDetailComponent } from './admin-course-detail.component';

describe('AdminCourseDetailComponent', () => {
  let component: AdminCourseDetailComponent;
  let fixture: ComponentFixture<AdminCourseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCourseDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCourseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
