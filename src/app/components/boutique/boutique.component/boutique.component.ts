import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AdminBoutiqueLayoutComponent } from "../../templates/admin-boutique-layout.component/admin-boutique-layout.component";

@Component({
  selector: 'app-boutique',
  imports: [AdminBoutiqueLayoutComponent],
  templateUrl: './boutique.component.html',
  styleUrl: './boutique.component.css',
})
export class BoutiqueComponent {
  constructor(private authService: AuthService, private router: Router) {}
  logout() {
    this.authService.logout();
    this.router.navigate(['login/boutique']);
  }
}
