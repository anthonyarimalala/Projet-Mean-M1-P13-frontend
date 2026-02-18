import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBoutiqueTestComponent } from './admin-boutique-test.component';

describe('AdminBoutiqueTestComponent', () => {
  let component: AdminBoutiqueTestComponent;
  let fixture: ComponentFixture<AdminBoutiqueTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBoutiqueTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBoutiqueTestComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
