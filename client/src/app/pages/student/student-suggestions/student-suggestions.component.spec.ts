import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSuggestionsComponent } from './student-suggestions.component';

describe('StudentSuggestionsComponent', () => {
  let component: StudentSuggestionsComponent;
  let fixture: ComponentFixture<StudentSuggestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentSuggestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
