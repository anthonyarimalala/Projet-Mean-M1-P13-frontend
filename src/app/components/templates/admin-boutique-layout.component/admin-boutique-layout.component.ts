import { Component, computed, signal } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-boutique-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-boutique-layout.component.html',
  styleUrl: './admin-boutique-layout.component.css',
})
export class AdminBoutiqueLayoutComponent {
  sidebarOpen = false;
  userMenuOpen = false;

  user = signal<string>('');
  role = signal<string>('');

  constructor(private authService: AuthService, private router: Router) {
    let nom = authService.getNom() ?? '';
    let prenom = authService.getPrenom() ?? '';
    this.user.set(prenom + ' ' + nom);
    this.role.set(authService.getRole() ?? '');
  }

  menus = computed(() => {
    const role = this.role();

    const adminMenu = [
      { label: 'Dashboard', link: '/template/dashboard' },
      { label: 'Annonces', link: '/admin/annonces' },
      { label: 'Inputs', link: '/template/inputs' },
      { label: 'Users', link: '/template/users' },
      { label: 'Shops', link: '/template/shops' },
    ];

    const boutiqueMenu = [
      { label: 'Dashboard', link: '/template/dashboard' },
      { label: 'Inputs', link: '/template/inputs' },
      { label: 'Users', link: '/template/users' },
      { label: 'Shops', link: '/template/shops' },
    ];


    return role === 'ADMIN' ? adminMenu : boutiqueMenu;
  });

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
    if (this.authService.getRole() == 'ADMIN') {
      this.authService.logout();
      this.router.navigate(['login/admin']);
    }
    else if (this.authService.getRole() == 'BOUTIQUE') {
      this.authService.logout();
      this.router.navigate(['login/boutique']);
    } else {
      this.authService.logout();
      this.router.navigate(['login/acheteur']);
    }
  }
}
