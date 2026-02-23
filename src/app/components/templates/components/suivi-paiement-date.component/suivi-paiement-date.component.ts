import { Component, signal, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  HistoriquePaiement,
  HistoriquePaiementService,
} from '../../../../services/paiement/historique-paiement.service';
import { ReadBoutique } from '../../../../models/anthony/ABoutique';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-suivi-paiement-date',
  imports: [CommonModule],
  templateUrl: './suivi-paiement-date.component.html',
  styleUrl: './suivi-paiement-date.component.css',
})
export class SuiviPaiementDateComponent implements OnInit {
  // boutique : ReadBoutique | null = null;
  @Input() boutique: ReadBoutique | null = null;
  locataireId: string = ''; // À initialiser selon votre logique
  userRole = signal<string>('');
  isOpen = signal<boolean>(false);
  paiements: HistoriquePaiement[] = [];
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  // Nouvelles propriétés pour la date du prochain paiement
  prochainPaiementDate = signal<Date | null>(null);
  sauvegardeEnCours = signal<boolean>(false);
  messageConfirmation = signal<string | null>(null);

  // Pagination
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = 0;
  totalPages = 0;

  constructor(private paiementService: HistoriquePaiementService, private authService: AuthService) {}

  ngOnInit() {
    this.userRole.set(this.authService.getRole() ?? '');
    this.chargerProchainPaiement();
    if (this.isOpen()) {
      this.chargerPaiements();
    }
  }

  // Nouvelle méthode pour gérer le changement de date
  onProchainPaiementChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.value) {
      this.prochainPaiementDate.set(new Date(input.value));
    } else {
      this.prochainPaiementDate.set(null);
    }
    // Effacer le message de confirmation précédent
    this.messageConfirmation.set(null);
  }

  // Nouvelle méthode pour enregistrer la date
  enregistrerProchainPaiement() {
    if (!this.prochainPaiementDate()) {
      alert('Veuillez sélectionner une date');
      return;
    }

    this.sauvegardeEnCours.set(true);
    this.messageConfirmation.set(null);

    // TODO: Implémenter l'appel API pour sauvegarder la date du prochain paiement
    // Vous devrez probablement créer une nouvelle méthode dans votre service
    // ou utiliser une API existante pour mettre à jour la boutique/locataire

    // Simulation pour le développement
    setTimeout(() => {
      this.sauvegardeEnCours.set(false);
      this.messageConfirmation.set('Date du prochain paiement enregistrée avec succès');
      setTimeout(() => this.messageConfirmation.set(null), 3000);
    }, 1000);
  }

  // Nouvelle méthode pour charger la date sauvegardée
  chargerProchainPaiement() {
    // TODO: Implémenter le chargement de la date depuis votre backend
    // Date par défaut : aujourd'hui + 30 jours
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 30);
    this.prochainPaiementDate.set(defaultDate);
  }

  toggleDropdown() {
    this.isOpen.set(!this.isOpen());
    if (this.isOpen() && this.paiements.length === 0) {
      this.chargerPaiements();
    }
  }

  private chargerPaiements() {
    if (!this.boutique?._id) return;

    this.loading.set(true);
    this.error.set(null);

    // Utilisation du service existant avec les filtres
    // Vous pouvez ajouter locataire_id ici si nécessaire
    const filters: { locataire_id?: string; boutique_id?: string } = {
      boutique_id: this.boutique._id,
    };

    // Ajouter locataire_id si disponible
    if (this.locataireId) {
      filters.locataire_id = this.locataireId;
    }

    this.paiementService.getPaiements(this.currentPage, this.itemsPerPage, filters).subscribe({
      next: (response) => {
        this.paiements = response.data;
        this.totalItems = response.total;
        this.totalPages = response.totalPages;
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des paiements:', err);
        this.error.set('Impossible de charger les paiements. Veuillez réessayer.');
        this.loading.set(false);
      },
    });
  }

  // Méthodes pour la pagination
  changerPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.chargerPaiements();
    }
  }

  pageSuivante() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.chargerPaiements();
    }
  }

  pagePrecedente() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.chargerPaiements();
    }
  }

  // Méthodes de formatage
  formatMontant(montant: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'MGA',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(montant)
      .replace('MGA', 'AR');
  }

  getStatusClass(statut: string): string {
    switch (statut) {
      case 'PAYE':
        return 'status-payed';
      case 'EN_ATTENTE':
        return 'status-pending';
      case 'ANNULE':
        return 'status-cancelled';
      default:
        return '';
    }
  }

  getStatusIcon(statut: string): string {
    switch (statut) {
      case 'PAYE':
        return '✅';
      case 'EN_ATTENTE':
        return '⏳';
      case 'ANNULE':
        return '❌';
      default:
        return '❓';
    }
  }

  getStatusLabel(statut: string): string {
    switch (statut) {
      case 'PAYE':
        return 'Payé';
      case 'EN_ATTENTE':
        return 'En attente';
      case 'ANNULE':
        return 'Annulé';
      default:
        return statut;
    }
  }

  getModePaiementLabel(mode: string): string {
    switch (mode) {
      case 'CASH':
        return 'Espèces';
      case 'VIREMENT':
        return 'Virement';
      case 'CARTE':
        return 'Carte';
      case 'MOBILE_MONEY':
        return 'Mobile Money';
      default:
        return mode;
    }
  }

  // Vérifier si un paiement est en retard
  isEnRetard(paiement: HistoriquePaiement): boolean {
    if (paiement.statut !== 'EN_ATTENTE') return false;
    const datePrevue = new Date(paiement.date_prevue);
    const aujourdhui = new Date();
    return datePrevue < aujourdhui;
  }
}
