import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterOutlet } from '@angular/router';
import { AdminLayoutComponent } from "../admin-layout.component/admin-layout.component";

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, AdminLayoutComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {


  constructor(private authService: AuthService, private router: Router) {}
  logout() {
    this.authService.logout();
    this.router.navigate(['login/admin']);
  }
}
