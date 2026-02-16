import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBoutiqueUsersComponent } from './admin-boutique-users.component';

describe('AdminBoutiqueUsersComponent', () => {
  let component: AdminBoutiqueUsersComponent;
  let fixture: ComponentFixture<AdminBoutiqueUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBoutiqueUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBoutiqueUsersComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
