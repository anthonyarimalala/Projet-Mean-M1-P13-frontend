import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsUtilisateursComponent } from './stats-utilisateurs.component';

describe('StatsUtilisateursComponent', () => {
  let component: StatsUtilisateursComponent;
  let fixture: ComponentFixture<StatsUtilisateursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsUtilisateursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsUtilisateursComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
