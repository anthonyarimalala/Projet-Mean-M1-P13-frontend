import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviPaiementDateComponent } from './suivi-paiement-date.component';

describe('SuiviPaiementDateComponent', () => {
  let component: SuiviPaiementDateComponent;
  let fixture: ComponentFixture<SuiviPaiementDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuiviPaiementDateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuiviPaiementDateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
