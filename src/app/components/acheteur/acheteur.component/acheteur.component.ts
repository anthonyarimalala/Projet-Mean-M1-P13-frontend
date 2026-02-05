import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-acheteur',
  imports: [],
  templateUrl: './acheteur.component.html',
  styleUrl: './acheteur.component.css',
})
export class AcheteurComponent {
  constructor(private authService: AuthService, private router: Router) {}
  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
