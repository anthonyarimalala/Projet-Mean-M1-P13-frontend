import { Component, Input, OnInit } from '@angular/core';
import { TestStatistiquesUtilisateurs } from '../models/test-models';

@Component({
  selector: 'app-stats-utilisateurs',
  templateUrl: './stats-utilisateurs.component.html',
  styleUrls: ['./stats-utilisateurs.component.css']
})
export class StatsUtilisateursComponent implements OnInit {
  @Input() stats!: TestStatistiquesUtilisateurs;

  constructor() { }

  ngOnInit(): void {
  }

  get totalUsers(): number {
    const total = this.stats?.total ?? 0;
    const boutiques = this.stats?.boutiques ?? 0;
    const acheteurs = this.stats?.acheteurs ?? 0;
    return total || Math.max(boutiques + acheteurs, 1);
  }

  get boutiquesPercent(): number {
    return Math.round(((this.stats?.boutiques ?? 0) / this.totalUsers) * 100);
  }

  get acheteursPercent(): number {
    return Math.round(((this.stats?.acheteurs ?? 0) / this.totalUsers) * 100);
  }

  get autresPercent(): number {
    const used = this.boutiquesPercent + this.acheteursPercent;
    return Math.max(0, 100 - used);
  }

  get pieBackground(): string {
    const b = this.boutiquesPercent;
    const a = this.acheteursPercent;
    const o = this.autresPercent;
    const bEnd = b;
    const aEnd = b + a;
    return `conic-gradient(#48c774 0% ${bEnd}%, #5faee3 ${bEnd}% ${aEnd}%, #a0aec0 ${aEnd}% ${aEnd + o}%)`;
  }
}
