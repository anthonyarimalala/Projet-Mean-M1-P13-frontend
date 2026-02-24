import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBoutiqueDemandeComponent } from './admin-boutique-demande.component';

describe('AdminBoutiqueDemandeComponent', () => {
  let component: AdminBoutiqueDemandeComponent;
  let fixture: ComponentFixture<AdminBoutiqueDemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBoutiqueDemandeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBoutiqueDemandeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
