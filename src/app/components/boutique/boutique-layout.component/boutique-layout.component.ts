import { Component, computed, signal } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-boutique-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './boutique-layout.component.html',
  styleUrl: './boutique-layout.component.css',
})
export class BoutiqueLayoutComponent {
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
      { label: 'Dashboard', link: '/boutique-layout/dashboard' },
      { label: 'Inputs', link: '/boutique-layout/inputs' },
      { label: 'Users', link: '/boutique-layout/users' },
      { label: 'Shops', link: '/boutique-layout/shops' },
      { label: 'Forms' , link: '/boutique-layout/forms'},
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
