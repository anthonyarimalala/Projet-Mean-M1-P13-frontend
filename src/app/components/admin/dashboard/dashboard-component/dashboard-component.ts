import { Component, OnInit } from '@angular/core';
import { TestStatistiquesAnnonces, TestStatistiquesBoutiques, TestStatistiquesUtilisateurs } from '../models/test-models';
import { DashboardDataService } from '../services/dashboard-data.service';
import { StatsBoutiquesComponent } from "../stats-boutiques.component/stats-boutiques.component";
import { StatsUtilisateursComponent } from "../stats-utilisateurs.component/stats-utilisateurs.component";
import { StatsAnnoncesComponent } from "../stats-annonces.component/stats-annonces.component";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-component.html',
  styleUrls: ['./dashboard-component.css'],
  imports: [StatsBoutiquesComponent, StatsUtilisateursComponent, StatsAnnoncesComponent]
})
export class DashboardComponent implements OnInit {
  statsBoutiques!: TestStatistiquesBoutiques;
  statsUtilisateurs!: TestStatistiquesUtilisateurs;
  statsAnnonces!: TestStatistiquesAnnonces;

  constructor(private dashboardDataService: DashboardDataService) { }

  ngOnInit(): void {
    this.loadStats();
  }

  private loadStats(): void {
    this.statsBoutiques = this.dashboardDataService.getStatistiquesBoutiques();
    this.statsUtilisateurs = this.dashboardDataService.getStatistiquesUtilisateurs();
    this.statsAnnonces = this.dashboardDataService.getStatistiquesAnnonces();
  }
}
