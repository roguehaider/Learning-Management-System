import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentClickComponent } from './parent-click.component';

describe('ParentClickComponent', () => {
  let component: ParentClickComponent;
  let fixture: ComponentFixture<ParentClickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentClickComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentClickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
