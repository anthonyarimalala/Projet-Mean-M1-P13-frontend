import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopAvisComponent } from './shop-avis.component';

describe('ShopAvisComponent', () => {
  let component: ShopAvisComponent;
  let fixture: ComponentFixture<ShopAvisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopAvisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopAvisComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
