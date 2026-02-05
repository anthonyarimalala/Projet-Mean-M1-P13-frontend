import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core';

export const authBoutiqueGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const profil = authService.getRole();
  if(profil == 'BOUTIQUE') return true;
  return false;
};
