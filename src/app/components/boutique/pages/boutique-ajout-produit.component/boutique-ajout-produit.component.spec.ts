import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueAjoutProduitComponent } from './boutique-ajout-produit.component';

describe('BoutiqueAjoutProduitComponent', () => {
  let component: BoutiqueAjoutProduitComponent;
  let fixture: ComponentFixture<BoutiqueAjoutProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueAjoutProduitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoutiqueAjoutProduitComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
