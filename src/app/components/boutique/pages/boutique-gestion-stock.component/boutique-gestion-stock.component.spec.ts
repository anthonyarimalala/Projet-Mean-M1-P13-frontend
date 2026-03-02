import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueGestionStockComponent } from './boutique-gestion-stock.component';

describe('BoutiqueGestionStockComponent', () => {
  let component: BoutiqueGestionStockComponent;
  let fixture: ComponentFixture<BoutiqueGestionStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueGestionStockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoutiqueGestionStockComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
