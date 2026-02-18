import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopDrawersComponent } from './shop-drawers.component';

describe('ShopDrawersComponent', () => {
  let component: ShopDrawersComponent;
  let fixture: ComponentFixture<ShopDrawersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopDrawersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopDrawersComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
