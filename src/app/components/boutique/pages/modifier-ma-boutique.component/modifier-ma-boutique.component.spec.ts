import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierMaBoutiqueComponent } from './modifier-ma-boutique.component';

describe('ModifierMaBoutiqueComponent', () => {
  let component: ModifierMaBoutiqueComponent;
  let fixture: ComponentFixture<ModifierMaBoutiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierMaBoutiqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierMaBoutiqueComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
