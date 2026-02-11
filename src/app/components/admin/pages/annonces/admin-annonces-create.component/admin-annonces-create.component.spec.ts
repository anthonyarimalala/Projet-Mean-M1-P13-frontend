import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAnnoncesCreateComponent } from './admin-annonces-create.component';

describe('AdminAnnoncesCreateComponent', () => {
  let component: AdminAnnoncesCreateComponent;
  let fixture: ComponentFixture<AdminAnnoncesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAnnoncesCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAnnoncesCreateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
