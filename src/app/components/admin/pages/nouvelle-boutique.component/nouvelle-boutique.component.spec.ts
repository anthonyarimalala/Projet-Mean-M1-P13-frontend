import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouvelleBoutiqueComponent } from './nouvelle-boutique.component';

describe('NouvelleBoutiqueComponent', () => {
  let component: NouvelleBoutiqueComponent;
  let fixture: ComponentFixture<NouvelleBoutiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NouvelleBoutiqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NouvelleBoutiqueComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
