import { TestBed } from '@angular/core/testing';

import { AnnonceCommentaireService } from './annonce-commentaire.service';

describe('AnnonceCommentaireService', () => {
  let service: AnnonceCommentaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnonceCommentaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
