import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDiaryComponent } from './student-diary.component';

describe('StudentDiaryComponent', () => {
  let component: StudentDiaryComponent;
  let fixture: ComponentFixture<StudentDiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDiaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
