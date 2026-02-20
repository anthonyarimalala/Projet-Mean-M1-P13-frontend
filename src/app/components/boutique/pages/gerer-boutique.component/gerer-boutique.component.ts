import { Component } from '@angular/core';
import { SuiviPaiementDateComponent } from '../../../templates/components/suivi-paiement-date.component/suivi-paiement-date.component';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-gerer-boutique.component',
  imports: [SuiviPaiementDateComponent, RouterLink],
  templateUrl: './gerer-boutique.component.html',
  styleUrls: [
    './gerer-boutique.component.css',
    '../../../templates/pages/admin-boutique-inputs.component/admin-boutique-inputs.component.css',
  ],
})
export class GererBoutiqueComponent {
  boutiqueId = "fdsfdg"; // Remplacez par l'ID réel de la boutique
}
