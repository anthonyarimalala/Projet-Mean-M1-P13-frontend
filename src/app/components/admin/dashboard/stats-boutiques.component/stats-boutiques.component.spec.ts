import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsBoutiquesComponent } from './stats-boutiques.component';

describe('StatsBoutiquesComponent', () => {
  let component: StatsBoutiquesComponent;
  let fixture: ComponentFixture<StatsBoutiquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsBoutiquesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsBoutiquesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
