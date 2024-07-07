import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherRemarksComponent } from './teacher-remarks.component';

describe('TeacherRemarksComponent', () => {
  let component: TeacherRemarksComponent;
  let fixture: ComponentFixture<TeacherRemarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherRemarksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherRemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
