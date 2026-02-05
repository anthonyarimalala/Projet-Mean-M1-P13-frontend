import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boutique',
  imports: [],
  templateUrl: './boutique.component.html',
  styleUrl: './boutique.component.css',
})
export class BoutiqueComponent {
  constructor(private authService: AuthService, private router: Router) {}
  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
