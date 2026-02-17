import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBoutiqueCommentaireComponent } from './admin-boutique-commentaire.component';

describe('AdminBoutiqueCommentaireComponent', () => {
  let component: AdminBoutiqueCommentaireComponent;
  let fixture: ComponentFixture<AdminBoutiqueCommentaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBoutiqueCommentaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBoutiqueCommentaireComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
