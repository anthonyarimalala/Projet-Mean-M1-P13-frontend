import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isConnected = authService.isConnected();
  const profil = authService.getRole();

  if(isConnected){
    // return false;
    if(profil == 'ADMIN'){
      router.navigate(['admin']);
    }
    if(profil == 'BOUTIQUE'){
      router.navigate(['boutique']);
    }
    if(profil == 'ACHETEUR'){
      router.navigate(['acheteur']);
    }
  }

  return true;
};
