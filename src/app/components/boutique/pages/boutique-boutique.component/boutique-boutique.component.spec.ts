import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueBoutiqueComponent } from './boutique-boutique.component';

describe('BoutiqueBoutiqueComponent', () => {
  let component: BoutiqueBoutiqueComponent;
  let fixture: ComponentFixture<BoutiqueBoutiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueBoutiqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoutiqueBoutiqueComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
