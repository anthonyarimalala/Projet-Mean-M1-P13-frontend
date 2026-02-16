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
// import { AdminAnnoncesComponent } from './components/admin/pages/admin-annonces.component/admin-annonces.component';
import { AdminAnnoncesComponent } from './components/admin/pages/annonces/admin-annonces.component/admin-annonces.component';
import { AdminBoutiqueLayoutComponent } from './components/templates/admin-boutique-layout.component/admin-boutique-layout.component';
import { AdminBoutiqueDashboardComponent } from './components/templates/pages/admin-boutique-dashboard.component/admin-boutique-dashboard.component';
import { AdminBoutiqueInputsComponent } from './components/templates/pages/admin-boutique-inputs.component/admin-boutique-inputs.component';
import { AdminBoutiqueUsersComponent } from './components/templates/pages/admin-boutique-users.component/admin-boutique-users.component';
import { AdminBoutiqueShopsComponent } from './components/templates/pages/admin-boutique-shops.component/admin-boutique-shops.component';

export const routes: Routes = [
  { path: 'login', redirectTo: 'login/acheteur', pathMatch: 'full' },
  { path: 'login/:role', component: LoginComponent, canMatch: [noAuthGuard] },
  { path: 'register', component: RegisterComponent, canMatch: [noAuthGuard] },

  // ADMIN
  //  { path: 'admin', component: AdminComponent, canMatch: [authAdminGuard]},
  {
    path: 'admin',
    component: AdminComponent,
    canMatch: [authAdminGuard],
    children: [
      { path: '', redirectTo: 'annonces', pathMatch: 'full' },
      { path: 'annonces', component: AdminAnnoncesComponent },
    ],
  },

  // BOUTIQUE
  // {
  //   path: 'boutique',
  //   component: BoutiqueComponent,
  //   canMatch: [authAdminGuard],
  //   children: [
  //     // { path: '', redirectTo: 'boutique', pathMatch: 'full' },
  //   ],
  // },

  { path: 'boutique', component: BoutiqueComponent, canActivate: [authBoutiqueGuard] },

  // ACHETEUR
  { path: 'acheteur', component: AcheteurComponent, canActivate: [authAcheteurGuard] },

  // TEMPLATE
  {
    path: 'template',
    component: AdminBoutiqueLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminBoutiqueDashboardComponent },
      { path: 'inputs', component: AdminBoutiqueInputsComponent },
      { path: 'users', component: AdminBoutiqueUsersComponent },
      { path: 'shops', component: AdminBoutiqueShopsComponent },
    ],
  },

  { path: '', redirectTo: 'login/acheteur', pathMatch: 'full' },
  { path: '**', redirectTo: 'login/acheteur', pathMatch: 'full' },
];
