import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifSuiviPaiementDateComponent } from './modif-suivi-paiement-date.component';

describe('ModifSuiviPaiementDateComponent', () => {
  let component: ModifSuiviPaiementDateComponent;
  let fixture: ComponentFixture<ModifSuiviPaiementDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifSuiviPaiementDateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifSuiviPaiementDateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
