import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBoutiqueDashboardComponent } from './admin-boutique-dashboard.component';

describe('AdminBoutiqueDashboardComponent', () => {
  let component: AdminBoutiqueDashboardComponent;
  let fixture: ComponentFixture<AdminBoutiqueDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBoutiqueDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBoutiqueDashboardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
