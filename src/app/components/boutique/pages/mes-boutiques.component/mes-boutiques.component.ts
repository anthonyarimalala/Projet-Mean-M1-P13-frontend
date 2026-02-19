import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-mes-boutiques.component',
  imports: [RouterLink],
  templateUrl: './mes-boutiques.component.html',
  styleUrl: './mes-boutiques.component.css',
})
export class MesBoutiquesComponent {
  constructor(private router: Router) {}

  gererBoutique(shopId: string) {
    console.log('Gérer boutique:', shopId);
    // Naviguer vers la page de gestion de la boutique
    this.router.navigate(['/mes-boutiques', shopId, 'gerer']);
  }

  nouvelleDemande() {
    console.log('Nouvelle demande');
    this.router.navigate(['/boutiques/demande']);
  }
}
