import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authBoutiqueGuard } from './auth-boutique-guard';

describe('authBoutiqueGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authBoutiqueGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
