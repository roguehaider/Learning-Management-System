import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesMadeComponent } from './sales-made.component';

describe('SalesMadeComponent', () => {
  let component: SalesMadeComponent;
  let fixture: ComponentFixture<SalesMadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesMadeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesMadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
