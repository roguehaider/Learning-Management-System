import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherClickComponent } from './teacher-click.component';

describe('TeacherClickComponent', () => {
  let component: TeacherClickComponent;
  let fixture: ComponentFixture<TeacherClickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherClickComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherClickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
