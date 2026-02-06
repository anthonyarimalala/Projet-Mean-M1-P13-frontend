import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core';

export const authBoutiqueGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const profil = authService.getRole();
  if (profil == 'BOUTIQUE') return true;
  else {
    router.navigate(['login']);
  }
  return false;
};
