import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { AboutiqueService } from './../../../../services/anthony/aboutique.service';
import { ReadBoutique } from '../../../../models/anthony/ABoutique';
import { CommonModule } from '@angular/common';
import { AdminBoutiqueDemandeComponent } from '../admin-boutique-demande.component/admin-boutique-demande.component';

@Component({
  selector: 'app-admin-boutique-shops',
  imports: [RouterLink, CommonModule, AdminBoutiqueDemandeComponent],
  templateUrl: './admin-boutique-shops.component.html',
  styleUrl: './admin-boutique-shops.component.css'
})
export class AdminBoutiqueShopsComponent {
  userRole = signal<string>('');
  demandeOuverte = signal<string | null>(null);
  boutiques = signal<ReadBoutique[]>([]);

  constructor(
    private router: Router,
    private authService: AuthService,
    private aboutiqueService: AboutiqueService
  ) {
    this.userRole.set(this.authService.getRole() ?? '');
  }

  ngOnInit() {
    this.loadBoutiques();
  }

  loadBoutiques() {
    const data = this.aboutiqueService.getBoutiques();

    if (data && typeof (data as any).subscribe === 'function') {
      (data as any).subscribe({
        next: (result: any) => {
          if (Array.isArray(result)) {
            this.boutiques.set(result);
          } else {
            console.error('Pas un tableau:', result);
            alert('Erreur: Le format des données est incorrect');
            this.boutiques.set([]);
          }
        },
        error: (err: any) => {
          console.error('Erreur chargement boutiques:', err);
          alert('Erreur lors du chargement des boutiques. Veuillez réessayer.');
          this.boutiques.set([]);
        }
      });
    } else if (Array.isArray(data)) {
      this.boutiques.set(data);
    } else {
      console.error('Type de données inattendu:', data);
      this.boutiques.set([]);
    }
  }

  toggleDemandeLocation(shopId: string) {
    if (this.demandeOuverte() === shopId) {
      this.annulerDemande();
    } else {
      this.demandeOuverte.set(shopId);
    }
  }

  annulerDemande() {
    this.demandeOuverte.set(null);
  }

  onDemandeSuccess() {
    alert('✅ Demande envoyée avec succès !');
  }

  onDemandeError(message: string) {
    alert(`❌ Erreur : ${message}`);
  }

  voirDetails(shopId: string) {
    this.router.navigate(['/admin/boutiques', shopId]);
  }
}