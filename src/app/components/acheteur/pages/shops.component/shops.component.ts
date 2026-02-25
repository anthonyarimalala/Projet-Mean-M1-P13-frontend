import { Component, signal } from '@angular/core';
import { Shop } from '../../models/buyer-models';
import { DataService } from '../../services/data.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReadBoutique } from '../../../../models/anthony/ABoutique';
import { AboutiqueService } from '../../../../services/anthony/aboutique.service';

@Component({
  selector: 'app-shops',
  imports: [RouterLink, FormsModule],
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css', '../../styles.css'],
})
export class ShopsComponent {
  shops: Shop[] = [];
  categoryFilter = '';
  boutiques = signal<ReadBoutique[]>([]);

  constructor(private readonly dataService: DataService, private aboutiqueService: AboutiqueService) {
    this.shops = this.dataService.getShops();
  }

  ngOnInit() {
    this.loadBoutiques();
  }

  loadBoutiques() {
    const data = this.aboutiqueService.getBoutiquesOuvert();

    if (data && typeof (data as any).subscribe === 'function') {
      (data as any).subscribe({
        next: (result: any) => {
          if (Array.isArray(result)) {
            this.boutiques.set(result);
          } else {
            console.error('Pas un tableau:', result);
            alert('Erreur: Le format des données est incorrect');
            this.boutiques.set([]);
          }
        },
        error: (err: any) => {
          console.error('Erreur chargement boutiques:', err);
          alert('Erreur lors du chargement des boutiques. Veuillez réessayer.');
          this.boutiques.set([]);
        }
      });
    } else if (Array.isArray(data)) {
      this.boutiques.set(data);
    } else {
      console.error('Type de données inattendu:', data);
      this.boutiques.set([]);
    }
  }

  get filteredShops() {
    if (!this.categoryFilter.trim()) {
      return this.shops;
    }
    const term = this.categoryFilter.toLowerCase();
    return this.shops.filter((shop) => shop.category.toLowerCase().includes(term));
  }
}
