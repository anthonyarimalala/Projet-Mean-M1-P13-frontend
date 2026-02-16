import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBoutiqueInputsComponent } from './admin-boutique-inputs.component';

describe('AdminBoutiqueInputsComponent', () => {
  let component: AdminBoutiqueInputsComponent;
  let fixture: ComponentFixture<AdminBoutiqueInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBoutiqueInputsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBoutiqueInputsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
