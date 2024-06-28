import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewAttendanceComponent } from './admin-view-attendance.component';

describe('AdminViewAttendanceComponent', () => {
  let component: AdminViewAttendanceComponent;
  let fixture: ComponentFixture<AdminViewAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewAttendanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminViewAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
