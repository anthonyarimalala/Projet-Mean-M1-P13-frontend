import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core';

export const authAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const profil = authService.getRole();
  if(profil == 'ADMIN') return true;
  return false;
};
