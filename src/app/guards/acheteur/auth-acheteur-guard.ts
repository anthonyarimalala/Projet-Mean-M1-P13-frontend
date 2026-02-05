import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const authAcheteurGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const profil = authService.getRole();
  if (profil == 'ACHETEUR') return true;
  return false;
};
