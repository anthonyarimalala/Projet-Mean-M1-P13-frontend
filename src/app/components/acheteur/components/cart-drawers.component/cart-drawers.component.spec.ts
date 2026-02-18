import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDrawersComponent } from './cart-drawers.component';

describe('CartDrawersComponent', () => {
  let component: CartDrawersComponent;
  let fixture: ComponentFixture<CartDrawersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartDrawersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartDrawersComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
