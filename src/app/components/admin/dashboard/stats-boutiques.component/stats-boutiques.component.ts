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
}
