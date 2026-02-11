import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAnnoncesListComponent } from './admin-annonces-list.component';

describe('AdminAnnoncesListComponent', () => {
  let component: AdminAnnoncesListComponent;
  let fixture: ComponentFixture<AdminAnnoncesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAnnoncesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAnnoncesListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
