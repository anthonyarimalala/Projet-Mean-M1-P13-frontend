import { CommonModule } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CartDrawersComponent } from '../components/cart-drawers.component/cart-drawers.component';
import { ShopDrawersComponent } from '../components/shop-drawers.component/shop-drawers.component';
import { CartService } from '../services/cart.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-acheteur-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CartDrawersComponent,
    ShopDrawersComponent,
  ],
  templateUrl: './acheteur-layout.component.html',
  styleUrl: './acheteur-layout.component.css',
})
export class AcheteurLayoutComponent {
  private shopsDrawerOpen = false;
  userMenuOpen = false;
  user = signal<{ firstName: string; lastName: string } | null>(null);
  isCompact = false;
  isHidden = false;
  private lastScrollTop = 0;

  constructor(
    private readonly cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {
    const firstName = authService.getPrenom() ?? '';
    const lastName = authService.getNom() ?? '';
    this.user.set({ firstName, lastName });
  }

  get cartCount() {
    return this.cartService.cartItems().reduce((total, item) => total + item.quantity, 0);
  }

  get cartOpen() {
    return this.cartService.isOpen();
  }

  get shopsOpen() {
    return this.shopsDrawerOpen;
  }

  openCart() {
    this.cartService.openCart();
  }

  toggleCart() {
    this.cartService.toggleCart();
  }

  closeCart() {
    this.cartService.closeCart();
  }

  toggleShops() {
    this.shopsDrawerOpen = !this.shopsDrawerOpen;
  }

  closeShops() {
    this.shopsDrawerOpen = false;
  }

  toggleUserMenu() {
    this.userMenuOpen = !this.userMenuOpen;
  }

  closeUserMenu() {
    this.userMenuOpen = false;
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.userMenuOpen = false;
  }

  onUserMenuClick(event: MouseEvent) {
    event.stopPropagation();
  }

  onLogoutClick() {
    this.closeUserMenu();
    this.authService.logout();
    this.router.navigate(['login/acheteur']);
  }

  onScroll(event: Event) {
    const target = event.target as Document;
    const top = (target?.documentElement?.scrollTop ?? window.scrollY) || 0;
    const direction = top > this.lastScrollTop ? 'down' : 'up';

    this.isCompact = top > 120;

    if (direction === 'down' && top > 180) {
      this.isHidden = true;
    } else if (direction === 'up') {
      this.isHidden = false;
    }

    this.lastScrollTop = top <= 0 ? 0 : top;
  }
}
