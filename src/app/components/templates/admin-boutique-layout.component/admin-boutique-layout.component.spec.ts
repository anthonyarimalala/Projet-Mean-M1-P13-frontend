import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBoutiqueLayoutComponent } from './admin-boutique-layout.component';

describe('AdminBoutiqueLayoutComponent', () => {
  let component: AdminBoutiqueLayoutComponent;
  let fixture: ComponentFixture<AdminBoutiqueLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBoutiqueLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBoutiqueLayoutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
