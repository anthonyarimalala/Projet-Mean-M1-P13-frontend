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
<<<<<<< Updated upstream
import { AdminBoutiqueTestComponent } from './components/templates/pages/admin-boutique-test.component/admin-boutique-test.component';
import { BoutiqueLayoutComponent } from './components/boutique/boutique-layout.component/boutique-layout.component';
import { BoutiqueFormComponent } from './components/boutique/pages/boutique-forms.component/boutique-forms.component';
=======
import { BoutiqueAnnonceComponent } from './components/boutique/pages/boutique-annonce.component/boutique-annonce.component';
import { AdminUsersComponent } from './components/admin/pages/users/admin-users.component/admin-users.component';
import { AcheteurLayoutComponent } from './components/acheteur/acheteur-layout.component/acheteur-layout.component';
import { AnnouncementsComponent } from './components/acheteur/pages/announcements.component/announcements.component';
import { ShopsComponent } from './components/acheteur/pages/shops.component/shops.component';
import { ShopDetailComponent } from './components/acheteur/pages/shop-detail.component/shop-detail.component';
import { CartComponent } from './components/acheteur/pages/cart.component/cart.component';
import { NouvelleBoutiqueComponent } from './components/admin/pages/nouvelle-boutique.component/nouvelle-boutique.component';
import { DemandeLocationComponent } from './components/admin/pages/demande-location.component/demande-location.component';
import { MesBoutiquesComponent } from './components/boutique/pages/mes-boutiques.component/mes-boutiques.component';
import { GererBoutiqueComponent } from './components/boutique/pages/gerer-boutique.component/gerer-boutique.component';
import { AdminBoutiqueComponent } from './components/admin/pages/admin-boutique.component/admin-boutique.component';
import { DetailBoutiqueComponent } from './components/admin/pages/detail-boutique.component/detail-boutique.component';
import { ModifSuiviPaiementDateComponent } from './components/templates/components/modif-suivi-paiement-date.component/modif-suivi-paiement-date.component';
import { BoutiqueModificationInfosComponent } from './components/boutique/pages/boutique-modification-infos.component/boutique-modification-infos.component';
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
  // {
  //   path: 'boutique',
  //   component: BoutiqueComponent,
  //   canMatch: [authAdminGuard],
  //   children: [
  //     // { path: '', redirectTo: 'boutique', pathMatch: 'full' },
  //   ],
  // },

  { path: 'boutique', component: BoutiqueComponent, canActivate: [authBoutiqueGuard] },
=======
  {
    path: 'boutique',
    component: BoutiqueComponent,
    canMatch: [authBoutiqueGuard],
    children: [
      { path: '', redirectTo: 'annonces', pathMatch: 'full' },
      { path: 'list', component: BoutiqueBoutiqueComponent },
      { path: 'mes-boutiques', component: MesBoutiquesComponent },
      { path: 'mes-boutiques/:id', component: GererBoutiqueComponent },
      { path: 'annonces', component: BoutiqueAnnonceComponent },
      { path: 'modifications/:id', component: BoutiqueModificationInfosComponent }
    ],
  },
>>>>>>> Stashed changes

  // ACHETEUR
  { path: 'acheteur', component: AcheteurComponent, canActivate: [authAcheteurGuard] },
  {
    path: 'boutique-layout',
    component: BoutiqueLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminBoutiqueDashboardComponent },
      { path: 'inputs', component: AdminBoutiqueInputsComponent },
      { path: 'users', component: AdminBoutiqueUsersComponent },
      { path: 'shops', component: AdminBoutiqueShopsComponent },
      { path: 'forms', component: BoutiqueFormComponent },
    ],
  },
  // TEMPLATE
 /* {
    path: 'template',
    component: AdminBoutiqueLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminBoutiqueDashboardComponent },
      { path: 'inputs', component: AdminBoutiqueInputsComponent },
      { path: 'users', component: AdminBoutiqueUsersComponent },
      { path: 'shops', component: AdminBoutiqueShopsComponent },
      { path: 'test', component: AdminBoutiqueTestComponent },
    ],
  },*/

  { path: '', redirectTo: 'login/acheteur', pathMatch: 'full' },
  { path: '**', redirectTo: 'login/acheteur', pathMatch: 'full' },
];
