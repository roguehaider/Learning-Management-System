import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClickComponent } from './admin-click.component';

describe('AdminClickComponent', () => {
  let component: AdminClickComponent;
  let fixture: ComponentFixture<AdminClickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminClickComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminClickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
