import { Component, OnInit, signal, computed, effect } from '@angular/core';
import { AnalyticDashboardResume, AnalyticsService } from '../../../../services/analytics/analytics-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats-boutiques',
  imports: [CommonModule],
  templateUrl: './stats-boutiques.component.html',
  styleUrls: ['./stats-boutiques.component.css']
})
export class StatsBoutiquesComponent implements OnInit {
  // Signals pour les données
  private statsSignal = signal<AnalyticDashboardResume | null>(null);
  private demandesEnAttenteSignal = signal<number>(0);
  private loadingSignal = signal<boolean>(true);
  private errorSignal = signal<string | null>(null);

  // Signals exposés publiquement (readonly)
  readonly stats = this.statsSignal.asReadonly();
  readonly demandesEnAttente = this.demandesEnAttenteSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  // Computed values
  readonly totalBoutiques = computed(() => {
    const stats = this.statsSignal();
    return stats?.totalBoutiques ?? 1;
  });

  readonly disponiblesPercent = computed(() => {
    const stats = this.statsSignal();
    const total = this.totalBoutiques();
    if (!stats || total === 0) return 0;
    return Math.round(((stats.disponibles ?? 0) / total) * 100);
  });

  readonly nonDisponiblesPercent = computed(() => {
    const stats = this.statsSignal();
    const total = this.totalBoutiques();
    if (!stats || total === 0) return 0;
    return Math.round(((stats.nonDisponibles ?? 0) / total) * 100);
  });

  readonly autresPercent = computed(() => {
    const used = this.disponiblesPercent() + this.nonDisponiblesPercent();
    return Math.max(0, 100 - used);
  });

  readonly pieBackground = computed(() => {
    const d = this.disponiblesPercent();
    const n = this.nonDisponiblesPercent();
    const o = this.autresPercent();

    // Si toutes les valeurs sont à 0, on affiche un gris par défaut
    if (d === 0 && n === 0 && o === 0) {
      return 'conic-gradient(#e2e8f0 0% 100%)';
    }

    const dEnd = d;
    const nEnd = d + n;
    return `conic-gradient(#48c774 0% ${dEnd}%, #f14668 ${dEnd}% ${nEnd}%, #a0aec0 ${nEnd}% ${nEnd + o}%)`;
  });

  readonly autresCount = computed(() => {
    const stats = this.statsSignal();
    if (!stats) return 0;
    return stats.totalBoutiques - (stats.disponibles + stats.nonDisponibles);
  });

  constructor(private analyticsService: AnalyticsService) {
    // Effet pour logger les changements (optionnel)
    effect(() => {
      const currentStats = this.statsSignal();
      if (currentStats) {
        console.log('Statistiques mises à jour:', currentStats);
      }
    });
  }

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    // Récupérer le résumé des boutiques
    this.analyticsService.getDashboardResume().subscribe({
      next: (data) => {
        this.statsSignal.set(data);
        this.loadingSignal.set(false);

        // Récupérer aussi les demandes en attente
        this.analyticsService.getDemandesStats().subscribe({
          next: (demandesData) => {
            this.demandesEnAttenteSignal.set(demandesData?.enAttente ?? 0);
          },
          error: (err) => {
            console.error('Erreur lors du chargement des demandes:', err);
            this.demandesEnAttenteSignal.set(0);
          }
        });
      },
      error: (err) => {
        console.error('Erreur lors du chargement des statistiques:', err);
        this.errorSignal.set('Impossible de charger les statistiques des boutiques');
        this.loadingSignal.set(false);
      }
    });
  }

  refresh(): void {
    this.loadStats();
  }
}
