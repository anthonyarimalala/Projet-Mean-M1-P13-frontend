import { TestBed } from '@angular/core/testing';

import { BoutiqueRecentesService } from './boutique-recentes.service';

describe('BoutiqueRecentesService', () => {
  let service: BoutiqueRecentesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoutiqueRecentesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
