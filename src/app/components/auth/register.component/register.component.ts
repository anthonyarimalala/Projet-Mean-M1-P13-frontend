import { AuthService } from './../../../services/auth.service';
import { Component, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { User } from '../../../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  // templateUrl: '../login.component/login.component.html',
  // template: `<p>testttt</p>`,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage = signal('');

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group(
      {
        prenom: ['Naruto', [Validators.required, Validators.minLength(2)]],
        nom: ['Uzumaki', [Validators.required, Validators.minLength(2)]],
        email: ['naruto@gmail.com', [Validators.required, Validators.email]],
        telephone: ['0345477478', [Validators.required, Validators.pattern('^[0-9]{8,15}$')]],
        profil: ['ACHETEUR', Validators.required],
        password: ['anthonyy', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['anthonyy', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { confirmPassword, ...data } = this.registerForm.value;

    console.log('Données inscription :', data);

    const user: User = data;
    console.log('User: ', user);
    this.authService.register(user).subscribe({
      next: (res) => {
        this.authService.login({ email: user.email!, password: user.password! }).subscribe({
          next: () => {

            // Redirection selon le rôle (plus tard)
            if (this.authService.getRole() === 'ADMIN') {
              this.router.navigate(['/dashboard']);
            } else {
              this.router.navigate(['/login']);
            }
          },
          error: (err) => {
            if (err.status === 401) {
              this.errorMessage.set(err.error.message);
            } else {
              this.errorMessage.set('Une erreur est survenue. Veuillez réessayer.');
            }
          },
        });
      },
      error: (err) => {
        if (err.status === 400) {
          this.errorMessage.set(err.error.message);
        } else {
          this.errorMessage.set('Une erreur est survenue. Veuillez réessayer.');
        }
      },
    });
    /*
      Plus tard :
      - appel API backend
      - création utilisateur
      - redirection vers login
    */
  }
}
