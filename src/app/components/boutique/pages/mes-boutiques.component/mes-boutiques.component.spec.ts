import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesBoutiquesComponent } from './mes-boutiques.component';

describe('MesBoutiquesComponent', () => {
  let component: MesBoutiquesComponent;
  let fixture: ComponentFixture<MesBoutiquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesBoutiquesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesBoutiquesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
