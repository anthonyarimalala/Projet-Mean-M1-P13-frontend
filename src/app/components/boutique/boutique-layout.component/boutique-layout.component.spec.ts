import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueLayoutComponent } from './boutique-layout.component';

describe('BoutiqueLayoutComponent', () => {
  let component: BoutiqueLayoutComponent;
  let fixture: ComponentFixture<BoutiqueLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoutiqueLayoutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
