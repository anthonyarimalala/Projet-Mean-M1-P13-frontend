import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Paiement {
  _id: string;
  user: string;
  userName: string;
  boutique: string;
  boutiqueNom: string;
  montant: number;
  datePaiementPrevu: Date;
  datePaiementReel: Date | null;
  statut: 'payé' | 'en_attente' | 'en_retard';
  modePaiement: 'cash' | 'mobile_money' | 'virement';
  reference: string;
}

@Component({
  selector: 'app-suivi-paiement-date',
  imports: [CommonModule],
  templateUrl: './suivi-paiement-date.component.html',
  styleUrl: './suivi-paiement-date.component.css',
})
export class SuiviPaiementDateComponent {
  @Input() boutiqueId: string = '';
  @Input() boutiqueNom: string = '';

  isOpen = signal<boolean>(false);
  paiements: Paiement[] = [];

  ngOnInit() {
    this.chargerPaiements();
  }

  toggleDropdown() {
    this.isOpen.set(!this.isOpen());
  }

  private chargerPaiements() {
    // Données statiques pour une boutique (Tech World - A12)
    this.paiements = [
      {
        _id: '1',
        user: 'user1',
        userName: 'Jean Dupont',
        boutique: 'A12',
        boutiqueNom: 'Tech World',
        montant: 8900000,
        datePaiementPrevu: new Date(2026, 0, 5),
        datePaiementReel: new Date(2026, 0, 5),
        statut: 'payé',
        modePaiement: 'virement',
        reference: 'VIR-2026-001'
      },
      {
        _id: '2',
        user: 'user1',
        userName: 'Jean Dupont',
        boutique: 'A12',
        boutiqueNom: 'Tech World',
        montant: 8900000,
        datePaiementPrevu: new Date(2026, 1, 5),
        datePaiementReel: new Date(2026, 1, 5),
        statut: 'payé',
        modePaiement: 'virement',
        reference: 'VIR-2026-089'
      },
      {
        _id: '3',
        user: 'user1',
        userName: 'Jean Dupont',
        boutique: 'A12',
        boutiqueNom: 'Tech World',
        montant: 8900000,
        datePaiementPrevu: new Date(2026, 2, 5),
        datePaiementReel: new Date(2026, 2, 3),
        statut: 'payé',
        modePaiement: 'virement',
        reference: 'VIR-2026-145'
      },
      {
        _id: '4',
        user: 'user1',
        userName: 'Jean Dupont',
        boutique: 'A12',
        boutiqueNom: 'Tech World',
        montant: 8900000,
        datePaiementPrevu: new Date(2026, 3, 5),
        datePaiementReel: null,
        statut: 'en_attente',
        modePaiement: 'virement',
        reference: 'VIR-2026-201'
      },
      {
        _id: '5',
        user: 'user1',
        userName: 'Jean Dupont',
        boutique: 'A12',
        boutiqueNom: 'Tech World',
        montant: 8900000,
        datePaiementPrevu: new Date(2026, 3, 5),
        datePaiementReel: null,
        statut: 'en_retard',
        modePaiement: 'virement',
        reference: 'VIR-2026-202'
      },
      {
        _id: '6',
        user: 'user1',
        userName: 'Jean Dupont',
        boutique: 'A12',
        boutiqueNom: 'Tech World',
        montant: 8900000,
        datePaiementPrevu: new Date(2025, 11, 5),
        datePaiementReel: new Date(2025, 11, 5),
        statut: 'payé',
        modePaiement: 'virement',
        reference: 'VIR-2025-342'
      }
    ];
  }

  formatMontant(montant: number): string {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'MGA',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(montant).replace('MGA', 'AR');
  }

  getStatusClass(statut: string): string {
    switch(statut) {
      case 'payé': return 'status-payed';
      case 'en_attente': return 'status-pending';
      case 'en_retard': return 'status-late';
      default: return '';
    }
  }

  getStatusIcon(statut: string): string {
    switch(statut) {
      case 'payé': return '✅';
      case 'en_attente': return '⏳';
      case 'en_retard': return '⚠️';
      default: return '❓';
    }
  }
}
