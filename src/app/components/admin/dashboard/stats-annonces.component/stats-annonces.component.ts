import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnalyticAnnonceStats, AnalyticsService } from '../../../../services/analytics/analytics-service';

@Component({
  selector: 'app-stats-annonces',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stats-annonces.component.html',
  styleUrls: ['./stats-annonces.component.css']
})
export class StatsAnnoncesComponent implements OnInit {
  // Signals pour les données
  private annonceStatsSignal = signal<AnalyticAnnonceStats | null>(null);
  private loadingSignal = signal<boolean>(false);
  private errorSignal = signal<string | null>(null);

  // Signals pour la sélection de mois/année
  selectedMonthSignal = signal<number>(new Date().getMonth() + 1);
  selectedYearSignal = signal<number>(new Date().getFullYear());

  // Options pour les selects
  readonly months = [
    { value: 1, label: 'Janvier' },
    { value: 2, label: 'Février' },
    { value: 3, label: 'Mars' },
    { value: 4, label: 'Avril' },
    { value: 5, label: 'Mai' },
    { value: 6, label: 'Juin' },
    { value: 7, label: 'Juillet' },
    { value: 8, label: 'Août' },
    { value: 9, label: 'Septembre' },
    { value: 10, label: 'Octobre' },
    { value: 11, label: 'Novembre' },
    { value: 12, label: 'Décembre' }
  ];

  readonly years = computed(() => {
    const currentYear = new Date().getFullYear();
    return [currentYear - 2, currentYear - 1, currentYear, currentYear + 1];
  });

  // Signals exposés publiquement
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  readonly selectedMonth = this.selectedMonthSignal.asReadonly();
  readonly selectedYear = this.selectedYearSignal.asReadonly();

  // Computed values pour les données affichées
  readonly statsData = computed<AnalyticAnnonceStats | null>(() => {
    return this.annonceStatsSignal();
  });

  readonly totalAnnonces = computed(() => {
    return this.annonceStatsSignal()?.totalGeneral || 0;
  });

  readonly annoncesMensuelles = computed(() => {
    const stats = this.annonceStatsSignal();
    if (!stats) return 0;
    return stats.statsMensuelles?.totalMois ?? 0;
  });

  readonly publiees = computed(() => {
    const stats = this.annonceStatsSignal();
    if (!stats) return 0;
    return stats.statsMensuelles?.publiees ?? 0;
  });

  readonly repartitionParRole = computed(() => {
    const stats = this.annonceStatsSignal();
    if (!stats) return null;
    return stats.statsMensuelles?.repartitionRoleEmetteur ?? null;
  });

  readonly moisLePlusActif = computed(() => {
    const stats = this.annonceStatsSignal();
    if (!stats?.moisLePlusActif) return null;

    const month = this.months.find(m => m.value === stats.moisLePlusActif.mois);
    return {
      month: month?.label || stats.moisLePlusActif.mois,
      count: stats.moisLePlusActif.total
    };
  });

  readonly selectedMonthLabel = computed(() => {
    const month = this.months.find(m => m.value === this.selectedMonthSignal());
    return month?.label ?? '';
  });

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    // Chargement par défaut avec le mois et l'année d'aujourd'hui
    const now = new Date();
    this.selectedMonthSignal.set(now.getMonth() + 1);
    this.selectedYearSignal.set(now.getFullYear());
    this.loadStatsForMonth(this.selectedMonthSignal(), this.selectedYearSignal());
  }

  loadStatsForMonth(month: number, year: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.analyticsService.getAnnoncesStatsByMonth(month, year).subscribe({
      next: (data) => {
        this.annonceStatsSignal.set(data);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des statistiques annonces:', err);
        this.errorSignal.set(`Impossible de charger les statistiques pour ${month}/${year}`);
        this.loadingSignal.set(false);
      }
    });
  }

  onValidate(): void {
    this.loadStatsForMonth(this.selectedMonthSignal(), this.selectedYearSignal());
  }

  getRoleLabel(role: string): string {
    switch(role) {
      case 'ADMIN': return 'Administrateurs';
      case 'BOUTIQUE': return 'Boutiques';
      case 'ACHETEUR': return 'Acheteurs';
      default: return role;
    }
  }
}
