import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentloginComponent } from './parentlogin.component';

describe('ParentloginComponent', () => {
  let component: ParentloginComponent;
  let fixture: ComponentFixture<ParentloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentloginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
