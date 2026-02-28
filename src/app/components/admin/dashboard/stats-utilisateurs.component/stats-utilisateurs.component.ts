import { Component, OnInit, signal, computed, effect } from '@angular/core';
import { AnalyticLatestUser, AnalyticsService, AnalyticUserStats } from '../../../../services/analytics/analytics-service';

export interface StatsUtilisateursData {
  total: number;
  boutiques: number;
  acheteurs: number;
  admins: number;
  derniersInscrits: AnalyticLatestUser[];
}

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
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  // Computed values pour les statistiques combinées
  readonly statsData = computed<StatsUtilisateursData | null>(() => {
    const userStats = this.userStatsSignal();
    const latestUsers = this.latestUsersSignal();

    if (!userStats) return null;

    return {
      total: userStats.total || 0,
      boutiques: userStats.BOUTIQUE || 0,
      acheteurs: userStats.ACHETEUR || 0,
      admins: userStats.ADMIN || 0,
      derniersInscrits: latestUsers || []
    };
  });

  readonly totalUsers = computed(() => {
    const stats = this.statsData();
    return stats?.total || 1;
  });

  readonly boutiquesPercent = computed(() => {
    const stats = this.statsData();
    const total = this.totalUsers();
    if (!stats || total === 0) return 0;
    return Math.round(((stats.boutiques) / total) * 100);
  });

  readonly acheteursPercent = computed(() => {
    const stats = this.statsData();
    const total = this.totalUsers();
    if (!stats || total === 0) return 0;
    return Math.round(((stats.acheteurs) / total) * 100);
  });

  readonly adminsPercent = computed(() => {
    const stats = this.statsData();
    const total = this.totalUsers();
    if (!stats || total === 0) return 0;
    return Math.round(((stats.admins) / total) * 100);
  });

  readonly autresCount = computed(() => {
    const stats = this.statsData();
    if (!stats) return 0;
    return stats.total - (stats.boutiques + stats.acheteurs + stats.admins);
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

    // Construction du gradient avec tous les segments
    const bEnd = b;
    const aEnd = b + a;
    const adEnd = b + a + ad;

    let gradient = '';
    if (b > 0) gradient += `#48c774 0% ${bEnd}%, `;
    if (a > 0) gradient += `#5faee3 ${bEnd}% ${aEnd}%, `;
    if (ad > 0) gradient += `#fbbf24 ${aEnd}% ${adEnd}%, `;
    if (o > 0) gradient += `#a0aec0 ${adEnd}% ${adEnd + o}%`;

    // Nettoyer le gradient si nécessaire
    gradient = gradient.replace(/, $/, '');

    return `conic-gradient(${gradient})`;
  });

  readonly legendItems = computed(() => {
    const stats = this.statsData();
    if (!stats) return [];

    const items = [];

    if (stats.boutiques > 0) {
      items.push({
        dotClass: 'boutique',
        label: 'Boutiques',
        value: stats.boutiques,
        percent: this.boutiquesPercent()
      });
    }

    if (stats.acheteurs > 0) {
      items.push({
        dotClass: 'acheteur',
        label: 'Acheteurs',
        value: stats.acheteurs,
        percent: this.acheteursPercent()
      });
    }

    if (stats.admins > 0) {
      items.push({
        dotClass: 'admin',
        label: 'Administrateurs',
        value: stats.admins,
        percent: this.adminsPercent()
      });
    }

    const autres = this.autresCount();
    if (autres > 0) {
      items.push({
        dotClass: 'autres',
        label: 'Autres',
        value: autres,
        percent: this.autresPercent()
      });
    }

    return items;
  });

  constructor(private analyticsService: AnalyticsService) {
    // Effet pour logger les changements (optionnel)
    effect(() => {
      const stats = this.statsData();
      if (stats) {
        console.log('Statistiques utilisateurs mises à jour:', stats);
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

        // Récupérer les derniers inscrits
        this.analyticsService.getLatestUsers().subscribe({
          next: (latestData) => {
            this.latestUsersSignal.set(latestData);
            this.loadingSignal.set(false);
          },
          error: (err) => {
            console.error('Erreur lors du chargement des derniers inscrits:', err);
            this.latestUsersSignal.set([]);
            this.loadingSignal.set(false);
          }
        });
      },
      error: (err) => {
        console.error('Erreur lors du chargement des statistiques utilisateurs:', err);
        this.errorSignal.set('Impossible de charger les statistiques des utilisateurs');
        this.loadingSignal.set(false);
      }
    });
  }

  refresh(): void {
    this.loadStats();
  }

  getInitial(nom: string, prenom?: string): string {
    if (prenom) return prenom.charAt(0).toUpperCase();
    return nom?.charAt(0).toUpperCase() || '?';
  }
}
