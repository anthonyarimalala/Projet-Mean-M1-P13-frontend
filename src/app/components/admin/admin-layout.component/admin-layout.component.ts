import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent {

  sidebarOpen = false;
  userMenuOpen = false;

  user = signal<string>("");
  role = signal<string>("");

  constructor(private authService: AuthService, private router: Router) {
    let nom = authService.getNom() ?? "";
    let prenom = authService.getPrenom() ?? "";
    this.user.set(prenom+" "+nom);
    this.role.set(authService.getRole() ?? "");
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
  }

  toggleUserMenu(): void {
    this.userMenuOpen = !this.userMenuOpen;
  }

  closeUserMenu(): void {
    this.userMenuOpen = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login/admin']);
  }
}
