import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-choice',
  templateUrl: './role-choice.component.html',
  styleUrls: ['./role-choice.component.css'],
})
export class RoleChoiceComponent {
  constructor(private router: Router) {}

  goToLogin(role: 'admin' | 'boutique' | 'acheteur') {
    this.router.navigate(['/login', role]);
  }
}