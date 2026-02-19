import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeLocationComponent } from './demande-location.component';

describe('DemandeLocationComponent', () => {
  let component: DemandeLocationComponent;
  let fixture: ComponentFixture<DemandeLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandeLocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeLocationComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
