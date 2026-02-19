import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererBoutiqueComponent } from './gerer-boutique.component';

describe('GererBoutiqueComponent', () => {
  let component: GererBoutiqueComponent;
  let fixture: ComponentFixture<GererBoutiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GererBoutiqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GererBoutiqueComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
