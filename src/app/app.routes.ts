import { authBoutiqueGuard } from './guards/boutique/auth-boutique-guard';
import { LoginComponent } from './components/auth/login.component/login.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from './components/auth/register.component/register.component';
import { authGuard } from './guards/auth-guard';
import { noAuthGuard } from './guards/no-auth-guard';
import { AdminComponent } from './components/admin/admin.component/admin.component';
import { BoutiqueComponent } from './components/boutique/boutique.component/boutique.component';
import { AcheteurComponent } from './components/acheteur/acheteur.component/acheteur.component';
import { authAdminGuard } from './guards/admin/auth-admin-guard';
import { authAcheteurGuard } from './guards/acheteur/auth-acheteur-guard';
import { AdminLayoutComponent } from './components/admin/admin-layout.component/admin-layout.component';
import { AdminDashboardComponent } from './components/admin/pages/admin-dashboard.component/admin-dashboard.component';
import { AdminInputsComponent } from './components/admin/pages/admin-inputs.component/admin-inputs.component';
import { AdminUsersComponent } from './components/admin/pages/admin-users.component/admin-users.component';
import { AdminShopsComponent } from './components/admin/pages/admin-shops.component/admin-shops.component';
// import { AdminAnnoncesComponent } from './components/admin/pages/admin-annonces.component/admin-annonces.component';
import { AdminAnnoncesComponent } from './components/admin/pages/annonces/admin-annonces.component/admin-annonces.component';

export const routes: Routes = [
   { path: 'login', redirectTo: 'login/acheteur', pathMatch: 'full' },
   { path: 'login/:role', component: LoginComponent, canMatch: [noAuthGuard]},
   { path: 'register', component: RegisterComponent, canMatch: [noAuthGuard]},

   // ADMIN
  //  { path: 'admin', component: AdminComponent, canMatch: [authAdminGuard]},
   {
    path: 'admin',
    component: AdminLayoutComponent,
    canMatch: [authAdminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'inputs', component: AdminInputsComponent },
      { path: 'users', component: AdminUsersComponent },
      { path: 'shops', component: AdminShopsComponent },
      { path: 'annonces', component: AdminAnnoncesComponent },
    ]
  },

   // BOUTIQUE
   { path: 'boutique', component: BoutiqueComponent, canActivate: [authBoutiqueGuard]},

   // ACHETEUR
   { path: 'acheteur', component: AcheteurComponent, canActivate: [authAcheteurGuard]},


   { path: '', redirectTo: 'login/acheteur', pathMatch: 'full' },
   { path: '**', redirectTo: 'login/acheteur', pathMatch: 'full' },
];
