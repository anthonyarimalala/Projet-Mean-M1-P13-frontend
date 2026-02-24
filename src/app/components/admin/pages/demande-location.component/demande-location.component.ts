import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { DemandeLocation, DemandeStats, DemandeStatut } from '../../../../models/demande-location';
import { DemandeLocationService } from '../../../../services/location/demande-location.service';

@Component({
  selector: 'app-demande-location',
  imports: [CommonModule, FormsModule],
  templateUrl: './demande-location.component.html',
  styleUrl: './demande-location.component.css',
})
export class DemandeLocationComponent implements OnInit {
  // Données
  demandes = signal<DemandeLocation[]>([]);
  stats = signal<DemandeStats | null>(null);
  
  // Pagination
  currentPage = signal(1);
  totalPages = signal(1);
  totalItems = signal(0);
  itemsPerPage = 10;
  
  // États
  isLoading = signal(false);
  showRejectModal = signal(false);
  selectedDemande = signal<DemandeLocation | null>(null);
  notesRejet = signal('');

  constructor(
    private demandeService: DemandeLocationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadStats();
    this.loadDemandes();
  }

  ngAfterViewInit() {
    // Attendre que le DOM soit prêt pour les tooltips
    setTimeout(() => {
      this.setupMessageTooltips();
    }, 500);
  }

  // Chargement des données
  loadDemandes() {
    this.isLoading.set(true);
    
    this.demandeService.getAllDemandes(
      this.currentPage(),
      this.itemsPerPage
    ).subscribe({
      next: (response) => {
        console.log('Réponse reçue:', response);
        
        if (response && response.items) {
          this.demandes.set(response.items);
          this.totalPages.set(response.totalPages || 1);
          this.totalItems.set(response.total || 0);
        } else {
          this.demandes.set([]);
        }
        
        this.isLoading.set(false);
        
        // Réinitialiser les tooltips
        setTimeout(() => {
          this.setupMessageTooltips();
        }, 100);
      },
      error: (err) => {
        console.error('Erreur chargement demandes:', err);
        alert('❌ Erreur lors du chargement des demandes');
        this.isLoading.set(false);
      }
    });
  }

  loadStats() {
    this.demandeService.getDemandesStats().subscribe({
      next: (stats) => {
        this.stats.set(stats);
      },
      error: (err) => {
        console.error('Erreur chargement stats:', err);
      }
    });
  }

  // Pagination
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      this.loadDemandes();
    }
  }

  // Actions sur les demandes
  approveDemande(demande: DemandeLocation) {
    if (!confirm(`Approuver la demande de ${demande.demandeur.nom} pour la boutique ${this.getNomBoutique(demande)} ?`)) {
      return;
    }

    const adminId = this.authService.getId();
    if (!adminId) {
      alert('Erreur: Administrateur non identifié');
      return;
    }

    this.isLoading.set(true);
    this.demandeService.updateDemandeStatut(demande._id, {
      statut: 'APPROUVEE',
      adminId: adminId
    }).subscribe({
      next: () => {
        alert('✅ Demande approuvée avec succès');
        this.loadDemandes();
        this.loadStats();
        this.isLoading.set(false);
      },
      error: (err) => {
        alert(`❌ Erreur: ${err.error?.message || 'Impossible d\'approuver la demande'}`);
        this.isLoading.set(false);
      }
    });
  }

  openRejectModal(demande: DemandeLocation) {
    this.selectedDemande.set(demande);
    this.notesRejet.set('');
    this.showRejectModal.set(true);
  }

  closeRejectModal() {
    this.showRejectModal.set(false);
    this.selectedDemande.set(null);
    this.notesRejet.set('');
  }

  confirmReject() {
    const demande = this.selectedDemande();
    if (!demande) return;

    const adminId = this.authService.getId();
    if (!adminId) {
      alert('Erreur: Administrateur non identifié');
      return;
    }

    this.isLoading.set(true);
    this.demandeService.updateDemandeStatut(demande._id, {
      statut: 'REJETEE',
      adminId: adminId,
      notes: this.notesRejet() || undefined
    }).subscribe({
      next: () => {
        alert('✅ Demande refusée');
        this.closeRejectModal();
        this.loadDemandes();
        this.loadStats();
        this.isLoading.set(false);
      },
      error: (err) => {
        alert(`❌ Erreur: ${err.error?.message || 'Impossible de refuser la demande'}`);
        this.isLoading.set(false);
      }
    });
  }

  // Tooltips pour les messages
  setupMessageTooltips() {
    const rows = document.querySelectorAll('.row[data-message]');
    const tooltip = document.getElementById('messageTooltip');

    if (!tooltip) return;

    rows.forEach(row => {
      row.addEventListener('mouseenter', (e) => {
        const target = e.currentTarget as HTMLElement;
        const message = target.dataset['message'];

        if (message) {
          tooltip.textContent = message;
          tooltip.classList.add('visible');

          const rect = target.getBoundingClientRect();
          tooltip.style.left = rect.left + 'px';
          tooltip.style.top = (rect.bottom + 10) + 'px';
          tooltip.style.maxWidth = Math.min(400, rect.width) + 'px';
        }
      });

      row.addEventListener('mousemove', (e) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();
        tooltip.style.left = rect.left + 'px';
        tooltip.style.top = (rect.bottom + 10) + 'px';
      });

      row.addEventListener('mouseleave', () => {
        tooltip.classList.remove('visible');
      });
    });

    window.addEventListener('scroll', () => {
      tooltip.classList.remove('visible');
    }, { passive: true });
  }

  // Utilitaires pour accéder aux données imbriquées
  getNomBoutique(demande: DemandeLocation): string {
    return demande.boutique?.nom_demande || 'N/A';
  }

  getNumeroBoutique(demande: DemandeLocation): string {
    return demande.boutique?.boutique_id?.numero || demande.boutique?.numero || 'N/A';
  }

  getEtageBoutique(demande: DemandeLocation): string {
    const etage = demande.boutique?.boutique_id?.etage;
    if (etage === undefined) return 'N/A';
    if (etage === 0) return 'Rez-de-chaussée';
    return `${etage}${etage === 1 ? 'er' : 'ème'} étage`;
  }

  getTelephoneDemandeur(demande: DemandeLocation): string {
    return demande.demandeur?.user_id?.telephone || 'Non renseigné';
  }

  formatDate(date: Date | string | undefined): string {
    if (!date) return '-';
    try {
      return new Date(date).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return '-';
    }
  }

  getStatutClass(statut: DemandeStatut): string {
    const classes: Record<DemandeStatut, string> = {
      'EN_ATTENTE': 'status-pending',
      'APPROUVEE': 'status-approved',
      'REJETEE': 'status-rejected',
      'ANNULEE': 'status-cancelled'
    };
    return classes[statut] || '';
  }

  getStatutLibelle(statut: DemandeStatut): string {
    const libelles: Record<DemandeStatut, string> = {
      'EN_ATTENTE': 'En attente',
      'APPROUVEE': 'Approuvée',
      'REJETEE': 'Refusée',
      'ANNULEE': 'Annulée'
    };
    return libelles[statut] || statut;
  }

  getInitials(nom: string): string {
    if (!nom) return '??';
    return nom.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  getAvatarClass(index: number): string {
    return index % 2 === 0 ? 'avatar' : 'avatar alt';
  }
}