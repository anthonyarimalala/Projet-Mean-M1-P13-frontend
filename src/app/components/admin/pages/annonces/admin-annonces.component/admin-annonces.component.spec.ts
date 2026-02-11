import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAnnoncesComponent } from './admin-annonces.component';

describe('AdminAnnoncesComponent', () => {
  let component: AdminAnnoncesComponent;
  let fixture: ComponentFixture<AdminAnnoncesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAnnoncesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAnnoncesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
