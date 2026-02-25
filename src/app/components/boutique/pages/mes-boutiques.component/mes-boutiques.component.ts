import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReadBoutique } from '../../../../models/anthony/ABoutique';
import { AboutiqueService } from '../../../../services/anthony/aboutique.service';
import { AuthService } from '../../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mes-boutiques.component',
  imports: [RouterLink, CommonModule],
  templateUrl: './mes-boutiques.component.html',
  styleUrl: './mes-boutiques.component.css',
})
export class MesBoutiquesComponent {
  boutiques = signal<ReadBoutique[]>([]);

  constructor(
    private boutiqueService: AboutiqueService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.chargerBoutiquesLocataire();
  }

  chargerBoutiquesLocataire() {
    this.boutiqueService.getBoutiquesByLocataire(this.authService.getId() ?? '').subscribe({
      next: (boutiques) => {
        this.boutiques.set(boutiques);
        console.log('Boutiques du locataire chargées:', boutiques);
      },
      error: (erreur) => {
        console.error('Erreur lors du chargement des boutiques:', erreur);
        // Gérer l'erreur (afficher un message à l'utilisateur, etc.)
      },
    });
  }

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
