import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBoutiqueAnnoncesListComponent } from './admin-boutique-annonces-list.component';

describe('AdminBoutiqueAnnoncesListComponent', () => {
  let component: AdminBoutiqueAnnoncesListComponent;
  let fixture: ComponentFixture<AdminBoutiqueAnnoncesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBoutiqueAnnoncesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBoutiqueAnnoncesListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
