import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AdminComponent } from "../admin.component/admin.component";
import { BoutiqueComponent } from "../../boutique/boutique.component/boutique.component";
import { AcheteurComponent } from "../../acheteur/acheteur.component/acheteur.component";

@Component({
  selector: 'app-dashboard',
  imports: [AdminComponent, BoutiqueComponent, AcheteurComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(private authService: AuthService, private router: Router) {}
  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
