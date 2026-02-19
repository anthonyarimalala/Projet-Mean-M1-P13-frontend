import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBoutiqueComponent } from './detail-boutique.component';

describe('DetailBoutiqueComponent', () => {
  let component: DetailBoutiqueComponent;
  let fixture: ComponentFixture<DetailBoutiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailBoutiqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailBoutiqueComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
