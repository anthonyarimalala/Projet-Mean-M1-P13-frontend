import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueFormComponent } from './boutique-forms.component';

describe('BoutiqueFormsComponent', () => {
  let component: BoutiqueFormComponent;
  let fixture: ComponentFixture<BoutiqueFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoutiqueFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
