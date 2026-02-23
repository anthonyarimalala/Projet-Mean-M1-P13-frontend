import { AboutiqueService } from './../../../../services/anthony/aboutique.service';
import { Component, signal } from '@angular/core';
import { SuiviPaiementDateComponent } from '../../../templates/components/suivi-paiement-date.component/suivi-paiement-date.component';
import { ReadBoutique } from '../../../../models/anthony/ABoutique';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-boutique.component',
  imports: [SuiviPaiementDateComponent],
  templateUrl: './detail-boutique.component.html',
  styleUrl: './detail-boutique.component.css',
})
export class DetailBoutiqueComponent {
  // boutique: ReadBoutique | null = null;
  boutique = signal<ReadBoutique | null>(null);

  constructor(private aboutiqueService: AboutiqueService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.aboutiqueService.getBoutiqueById(id).subscribe({
          next: (boutique: ReadBoutique) => {
            this.boutique.set(boutique);
            console.log('Boutique récupérée avec succès:', boutique.nom_boutique);
          },
          error: (err) => {
            console.error('Erreur lors de la récupération de la boutique', err);
          },
        });
      }
    });
  }
}
