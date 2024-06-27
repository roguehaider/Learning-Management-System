import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveTeacherComponent } from './approve-teacher.component';

describe('ApproveTeacherComponent', () => {
  let component: ApproveTeacherComponent;
  let fixture: ComponentFixture<ApproveTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveTeacherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
