import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBoutiqueAnnoncesCreateComponent } from './admin-boutique-annonces-create.component';

describe('AdminBoutiqueAnnoncesCreateComponent', () => {
  let component: AdminBoutiqueAnnoncesCreateComponent;
  let fixture: ComponentFixture<AdminBoutiqueAnnoncesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBoutiqueAnnoncesCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBoutiqueAnnoncesCreateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
