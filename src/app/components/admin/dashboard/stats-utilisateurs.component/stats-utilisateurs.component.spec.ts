import { Component, OnInit, signal, computed, effect } from '@angular/core';
import { AnalyticLatestUser, AnalyticsService, AnalyticUserStats } from '../../../../services/analytics/analytics-service';

@Component({
  selector: 'app-stats-utilisateurs',
  templateUrl: './stats-utilisateurs.component.html',
  styleUrls: ['./stats-utilisateurs.component.css']
})
export class StatsUtilisateursComponent implements OnInit {
  // Signals pour les données
  private userStatsSignal = signal<AnalyticUserStats | null>(null);
  private latestUsersSignal = signal<AnalyticLatestUser[]>([]);
  private loadingSignal = signal<boolean>(true);
  private errorSignal = signal<string | null>(null);

  // Signals exposés publiquement (readonly)
  readonly userStats = this.userStatsSignal.asReadonly();
  readonly latestUsers = this.latestUsersSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  // Computed values pour les statistiques
  readonly totalUsers = computed(() => {
    const stats = this.userStatsSignal();
    return stats?.total ?? 1;
  });

  readonly boutiquesCount = computed(() => {
    const stats = this.userStatsSignal();
    return stats?.BOUTIQUE ?? 0;
  });

  readonly acheteursCount = computed(() => {
    const stats = this.userStatsSignal();
    return stats?.ACHETEUR ?? 0;
  });

  readonly adminsCount = computed(() => {
    const stats = this.userStatsSignal();
    return stats?.ADMIN ?? 0;
  });

  readonly autresCount = computed(() => {
    return this.adminsCount();
  });

  readonly boutiquesPercent = computed(() => {
    const total = this.totalUsers();
    if (total === 0) return 0;
    return Math.round((this.boutiquesCount() / total) * 100);
  });

  readonly acheteursPercent = computed(() => {
    const total = this.totalUsers();
    if (total === 0) return 0;
    return Math.round((this.acheteursCount() / total) * 100);
  });

  readonly adminsPercent = computed(() => {
    const total = this.totalUsers();
    if (total === 0) return 0;
    return Math.round((this.adminsCount() / total) * 100);
  });

  readonly autresPercent = computed(() => {
    const used = this.boutiquesPercent() + this.acheteursPercent() + this.adminsPercent();
    return Math.max(0, 100 - used);
  });

  readonly pieBackground = computed(() => {
    const b = this.boutiquesPercent();
    const a = this.acheteursPercent();
    const ad = this.adminsPercent();
    const o = this.autresPercent();

    // Si toutes les valeurs sont à 0, on affiche un gris par défaut
    if (b === 0 && a === 0 && ad === 0 && o === 0) {
      return 'conic-gradient(#e2e8f0 0% 100%)';
    }

    const bEnd = b;
    const aEnd = b + a;
    const adEnd = b + a + ad;
    return `conic-gradient(#48c774 0% ${bEnd}%, #5faee3 ${bEnd}% ${aEnd}%, #fbbf24 ${aEnd}% ${adEnd}%, #a0aec0 ${adEnd}% ${adEnd + o}%)`;
  });

  constructor(private analyticsService: AnalyticsService) {
    // Effet pour logger les changements (optionnel)
    effect(() => {
      const currentStats = this.userStatsSignal();
      if (currentStats) {
        console.log('Statistiques utilisateurs mises à jour:', currentStats);
      }
    });
  }

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    // Récupérer les statistiques des utilisateurs
    this.analyticsService.getUsersStats().subscribe({
      next: (data) => {
        this.userStatsSignal.set(data);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des statistiques utilisateurs:', err);
        this.errorSignal.set('Impossible de charger les statistiques des utilisateurs');
        this.loadingSignal.set(false);
      }
    });

    // Récupérer les derniers utilisateurs inscrits
    this.analyticsService.getLatestUsers().subscribe({
      next: (data) => {
        this.latestUsersSignal.set(data);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des derniers utilisateurs:', err);
        this.latestUsersSignal.set([]);
      }
    });
  }

  refresh(): void {
    this.loadStats();
  }

  getInitial(name: string): string {
    return name?.charAt(0)?.toUpperCase() || '?';
  }

  getRoleClass(role: string): string {
    switch(role) {
      case 'BOUTIQUE':
        return 'role-boutique';
      case 'ACHETEUR':
        return 'role-acheteur';
      case 'ADMIN':
        return 'role-admin';
      default:
        return '';
    }
  }
}
