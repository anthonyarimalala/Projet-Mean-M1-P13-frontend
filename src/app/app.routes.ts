import { authBoutiqueGuard } from './guards/boutique/auth-boutique-guard';
import { LoginComponent } from './components/auth/login.component/login.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from './components/auth/register.component/register.component';
import { DashboardComponent } from './components/admin/dashboard.component/dashboard.component';
import { authGuard } from './guards/auth-guard';
import { noAuthGuard } from './guards/no-auth-guard';
import { AdminComponent } from './components/admin/admin.component/admin.component';
import { BoutiqueComponent } from './components/boutique/boutique.component/boutique.component';
import { AcheteurComponent } from './components/acheteur/acheteur.component/acheteur.component';
import { authAdminGuard } from './guards/admin/auth-admin-guard';
import { authAcheteurGuard } from './guards/acheteur/auth-acheteur-guard';

export const routes: Routes = [
   { path: 'login', redirectTo: 'login/acheteur', pathMatch: 'full' },
   { path: 'login/:role', component: LoginComponent, canMatch: [noAuthGuard]},
   { path: 'register', component: RegisterComponent, canMatch: [noAuthGuard]},

   // ADMIN
   { path: 'admin', component: AdminComponent, canMatch: [authAdminGuard]},
   { path: 'dashboard', component: DashboardComponent, canMatch: [authGuard] },

   // BOUTIQUE
   { path: 'boutique', component: BoutiqueComponent, canActivate: [authBoutiqueGuard]},

   // ACHETEUR
   { path: 'acheteur', component: AcheteurComponent, canActivate: [authAcheteurGuard]},


   { path: '', redirectTo: 'login/acheteur', pathMatch: 'full' },
   { path: '**', redirectTo: 'login/acheteur', pathMatch: 'full' },
];
