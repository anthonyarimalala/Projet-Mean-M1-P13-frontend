import { Component, signal } from '@angular/core';
import { SuiviPaiementDateComponent } from '../../../templates/components/suivi-paiement-date.component/suivi-paiement-date.component';
import { ReadBoutique } from '../../../../models/anthony/ABoutique';
import { ActivatedRoute } from '@angular/router';
import { AboutiqueService } from '../../../../services/anthony/aboutique.service';

@Component({
  selector: 'app-gerer-boutique.component',
  imports: [SuiviPaiementDateComponent],
  templateUrl: './gerer-boutique.component.html',
  styleUrl: './gerer-boutique.component.css',
})
export class GererBoutiqueComponent {
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
