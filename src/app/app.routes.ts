import { LoginComponent } from './components/auth/login.component/login.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from './components/auth/register.component/register.component';
import { DashboardComponent } from './components/admin/dashboard.component/dashboard.component';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'dashboard', component: DashboardComponent, canMatch: [authGuard]},

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
