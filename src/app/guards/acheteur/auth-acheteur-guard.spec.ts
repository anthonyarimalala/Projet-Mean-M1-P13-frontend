import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authAcheteurGuard } from './auth-acheteur-guard';

describe('authAcheteurGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authAcheteurGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
