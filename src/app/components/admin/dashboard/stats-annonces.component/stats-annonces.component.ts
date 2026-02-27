import { Component, Input, OnInit } from '@angular/core';
import { TestStatistiquesAnnonces } from '../models/test-models';

@Component({
  selector: 'app-stats-annonces',
  templateUrl: './stats-annonces.component.html',
  styleUrls: ['./stats-annonces.component.css']
})
export class StatsAnnoncesComponent implements OnInit {
  @Input() stats!: TestStatistiquesAnnonces;

  constructor() { }

  ngOnInit(): void {
  }

  formatDate(date: string): string {
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  }

  getMaxCount(): number {
    return Math.max(...this.stats.parDate.map(item => item.count));
  }

  getBarHeight(count: number): string {
    const max = this.getMaxCount();
    const percentage = (count / max) * 100;
    return `${percentage}%`;
  }
}
