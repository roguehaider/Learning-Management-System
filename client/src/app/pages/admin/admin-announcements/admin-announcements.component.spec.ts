import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAnnouncementsComponent } from './admin-announcements.component';

describe('AdminAnnouncementsComponent', () => {
  let component: AdminAnnouncementsComponent;
  let fixture: ComponentFixture<AdminAnnouncementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAnnouncementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
