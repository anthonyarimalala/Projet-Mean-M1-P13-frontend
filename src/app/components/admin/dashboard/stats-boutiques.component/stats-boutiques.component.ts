import { Component, Input, OnInit } from '@angular/core';
import { TestStatistiquesBoutiques } from '../models/test-models';

@Component({
  selector: 'app-stats-boutiques',
  templateUrl: './stats-boutiques.component.html',
  styleUrls: ['./stats-boutiques.component.css']
})
export class StatsBoutiquesComponent implements OnInit {
  @Input() stats!: TestStatistiquesBoutiques;

  constructor() { }

  ngOnInit(): void {
  }

  get totalBoutiques(): number {
    const total = this.stats?.total ?? 0;
    const disponibles = this.stats?.disponibles ?? 0;
    const nonDisponibles = this.stats?.nonDisponibles ?? 0;
    const autres = (this.stats?.enAttente ?? 0) + (this.stats?.validees ?? 0);
    return total || Math.max(disponibles + nonDisponibles + autres, 1);
  }

  get disponiblesPercent(): number {
    return Math.round(((this.stats?.disponibles ?? 0) / this.totalBoutiques) * 100);
  }

  get nonDisponiblesPercent(): number {
    return Math.round(((this.stats?.nonDisponibles ?? 0) / this.totalBoutiques) * 100);
  }

  get autresPercent(): number {
    const used = this.disponiblesPercent + this.nonDisponiblesPercent;
    return Math.max(0, 100 - used);
  }

  get pieBackground(): string {
    const d = this.disponiblesPercent;
    const n = this.nonDisponiblesPercent;
    const o = this.autresPercent;
    const dEnd = d;
    const nEnd = d + n;
    return `conic-gradient(#48c774 0% ${dEnd}%, #f14668 ${dEnd}% ${nEnd}%, #a0aec0 ${nEnd}% ${nEnd + o}%)`;
  }
}
