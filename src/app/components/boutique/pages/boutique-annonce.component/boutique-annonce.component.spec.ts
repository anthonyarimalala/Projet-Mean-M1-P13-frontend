import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueAnnonceComponent } from './boutique-annonce.component';

describe('BoutiqueAnnonceComponent', () => {
  let component: BoutiqueAnnonceComponent;
  let fixture: ComponentFixture<BoutiqueAnnonceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueAnnonceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoutiqueAnnonceComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
