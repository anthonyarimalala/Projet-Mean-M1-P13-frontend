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
}
