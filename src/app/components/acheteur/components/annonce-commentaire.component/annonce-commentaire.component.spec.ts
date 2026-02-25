import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceCommentaireComponent } from './annonce-commentaire.component';

describe('AnnonceCommentaireComponent', () => {
  let component: AnnonceCommentaireComponent;
  let fixture: ComponentFixture<AnnonceCommentaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnonceCommentaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnonceCommentaireComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
