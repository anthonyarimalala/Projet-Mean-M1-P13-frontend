import { TestBed } from '@angular/core/testing';

import { BoutiqueAvisService } from './boutique-avis.service';

describe('BoutiqueAvisService', () => {
  let service: BoutiqueAvisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoutiqueAvisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
