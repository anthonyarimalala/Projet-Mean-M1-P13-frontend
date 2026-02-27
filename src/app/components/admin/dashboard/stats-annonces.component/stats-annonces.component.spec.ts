import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsAnnoncesComponent } from './stats-annonces.component';

describe('StatsAnnoncesComponent', () => {
  let component: StatsAnnoncesComponent;
  let fixture: ComponentFixture<StatsAnnoncesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsAnnoncesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsAnnoncesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
