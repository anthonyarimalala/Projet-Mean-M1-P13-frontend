import { AboutiqueService } from './../../../../services/anthony/aboutique.service';
import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { ReadBoutique } from '../../../../models/anthony/ABoutique';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-boutique-shops',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './admin-boutique-shops.component.html',
  styleUrl: './admin-boutique-shops.component.css',
})
export class AdminBoutiqueShopsComponent {
  userRole = signal<string>('');
  demandeOuverte = signal<string | null>(null);

  boutiques = signal<ReadBoutique[]>([]);

  formData = {
    nomBoutique: '',
    categories: '',
    siteWeb: '',
    message: '',
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private aboutiqueService: AboutiqueService
  ) {
    this.userRole.set(this.authService.getRole() ?? '');
  }

  ngOnInit() {
    // Assurez-vous que ceci retourne bien un tableau
    const data = this.aboutiqueService.getBoutiques();

    // Si c'est un observable
    if (data && typeof (data as any).subscribe === 'function') {
      (data as any).subscribe((result: any) => {
        if (Array.isArray(result)) {
          this.boutiques.set(result);
        } else {
          console.error('Pas un tableau:', result);
          this.boutiques.set([]);
        }
      });
    }
    // Si c'est déjà un tableau
    else if (Array.isArray(data)) {
      this.boutiques.set(data);
    }
  }

  onNouvelleBoutique() {
    // this.router.navigate(['/admin/boutiques/nouveau']);
  }

  toggleDemandeLocation(shopId: string) {
    if (this.demandeOuverte() === shopId) {
      this.annulerDemande();
    } else {
      this.demandeOuverte.set(shopId);
      this.resetForm();
    }
  }

  annulerDemande() {
    this.demandeOuverte.set(null);
    this.resetForm();
  }

  resetForm() {
    this.formData = {
      nomBoutique: '',
      categories: '',
      siteWeb: '',
      message: '',
    };
  }

  formValide(): boolean {
    // Seuls nomBoutique et categories sont requis
    return this.formData.nomBoutique.trim() !== '' && this.formData.categories.trim() !== '';
    // siteWeb et message sont optionnels
  }

  soumettreDemande(shopId: string) {
    if (this.formValide()) {
      const demandeData = {
        shopId: shopId,
        ...this.formData,
        dateDemande: new Date().toISOString(),
      };

      console.log('Demande pour la boutique:', demandeData);

      // Ici, vous appellerez votre service pour envoyer la demande
      alert('Demande envoyée avec succès !');
      this.annulerDemande();
    }
  }

  voirDetails(shopId: string) {
    this.router.navigate(['/admin/boutiques', shopId]);
  }
}
