import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBoutiqueShopsComponent } from './admin-boutique-shops.component';

describe('AdminBoutiqueShopsComponent', () => {
  let component: AdminBoutiqueShopsComponent;
  let fixture: ComponentFixture<AdminBoutiqueShopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBoutiqueShopsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBoutiqueShopsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
