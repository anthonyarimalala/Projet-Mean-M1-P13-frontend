import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueModificationInfosComponent } from './boutique-modification-infos.component';

describe('BoutiqueModificationInfosComponent', () => {
  let component: BoutiqueModificationInfosComponent;
  let fixture: ComponentFixture<BoutiqueModificationInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueModificationInfosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoutiqueModificationInfosComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
