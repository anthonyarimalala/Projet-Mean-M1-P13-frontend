import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const authAcheteurGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const profil = authService.getRole();
  if (profil == 'ACHETEUR') return true;
  else {
    router.navigate(['login']);
  }
  return false;


};
