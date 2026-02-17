import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBoutiqueAnnonces } from './admin-boutique-annonces';

describe('AdminBoutiqueAnnonces', () => {
  let component: AdminBoutiqueAnnonces;
  let fixture: ComponentFixture<AdminBoutiqueAnnonces>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBoutiqueAnnonces]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBoutiqueAnnonces);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
