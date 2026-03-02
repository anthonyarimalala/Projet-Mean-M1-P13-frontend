import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueCommandesComponent } from './boutique-commandes.component';

describe('BoutiqueCommandesComponent', () => {
  let component: BoutiqueCommandesComponent;
  let fixture: ComponentFixture<BoutiqueCommandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueCommandesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoutiqueCommandesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
