import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSuggestionsComponent } from './teacher-suggestions.component';

describe('TeacherSuggestionsComponent', () => {
  let component: TeacherSuggestionsComponent;
  let fixture: ComponentFixture<TeacherSuggestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherSuggestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
