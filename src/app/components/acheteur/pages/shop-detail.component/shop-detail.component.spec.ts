import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopDetailComponent } from './shop-detail.component';

describe('ShopDetailComponent', () => {
  let component: ShopDetailComponent;
  let fixture: ComponentFixture<ShopDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopDetailComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
