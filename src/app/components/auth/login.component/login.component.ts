import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage = signal('');
  loading = signal(false);
  role!: 'admin' | 'boutique' | 'acheteur';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false],
    });

    const allowedRoles = ['admin', 'boutique', 'acheteur'] as const;

    this.route.paramMap.subscribe((params) => {
      const paramRole = params.get('role') as any;

      // ❗ rôle invalide → redirection URL
      if (!allowedRoles.includes(paramRole)) {
        this.router.navigate(['/login/acheteur'], { replaceUrl: true });
        return;
      }

      this.role = paramRole;

      const defaults = {
        admin: { email: 'anthony@gmail.com', password: 'anthonyy' },
        boutique: { email: 'sasuke@gmail.com', password: 'anthonyy' },
        acheteur: { email: 'naruto@gmail.com', password: 'anthonyy' },
      };

      this.loginForm.patchValue(defaults[this.role]);
    });
  }


  onSubmit() {
    this.loading.set(true);
    this.errorMessage.set('');
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    this.authService.login({ email: email!, password: password! }).subscribe({
      next: () => {
        const role = this.authService.getRole();
        // Redirection selon le rôle (plus tard)
        if (role === 'ADMIN') {
          this.loading.set(false);
          this.router.navigate(['/admin']);
        }
        else if(role === 'BOUTIQUE') {
          this.loading.set(false);
          this.router.navigate(['/boutique']);
        }
        else if(role === 'ACHETEUR') {
          this.loading.set(false);
          this.router.navigate(['/acheteur']);
        }
        else {
          this.loading.set(false);
        }
      },
      error: (err) => {
        this.loading.set(false);
        if (err.status === 401) {
          this.errorMessage.set(err.error.message);
        } else {
          this.errorMessage.set('Une erreur est survenue. Veuillez réessayer.');
        }
      },
    });
  }
}


// constructor(private authService: AuthService, private router: Router) {}

//   onClick() {
//     this.authService.logout();
//     this.router.navigate(['/login/acheteur'], { replaceUrl: true });
//   }
