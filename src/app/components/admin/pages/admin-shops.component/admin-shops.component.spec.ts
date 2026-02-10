import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShopsComponent } from './admin-shops.component';

describe('AdminShopsComponent', () => {
  let component: AdminShopsComponent;
  let fixture: ComponentFixture<AdminShopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminShopsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminShopsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
