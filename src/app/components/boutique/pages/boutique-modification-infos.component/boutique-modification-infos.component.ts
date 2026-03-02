import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { BoutiqueService } from '../../../../services/boutique/boutique.service';


@Component({
  selector: 'app-boutique-modification-infos.component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './boutique-modification-infos.component.html',
  styleUrls: ['./boutique-modification-infos.component.css'],
})
export class BoutiqueModificationInfosComponent implements OnInit {

  boutiqueId!: string;
  boutique: any;
  errorMessage = '';
  categoriesString = '';

  constructor(
    private route: ActivatedRoute,
    private boutiqueService: BoutiqueService,
    private cdr: ChangeDetectorRef,
    private router: Router  // <-- Inject Router pour redirection
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.boutiqueId = params.get('id')!;
      this.loadBoutique();
    });
  }

  loadBoutique() {
    this.boutiqueService.getBoutiqueById(this.boutiqueId).subscribe({
      next: (data) => {
        // Affichage dans la console avant de remplir le formulaire
        console.log('ID de la boutique :', data._id);
        console.log('Données complètes de la boutique :', data);

        this.boutique = data;
        this.categoriesString = this.boutique.categories?.join(', ') || '';

        // Forcer Angular à rafraîchir le template
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erreur serveur';
      }
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      alert('Veuillez remplir tous les champs requis !');
      return;
    }

    // Convertir les catégories en tableau
    this.boutique.categories = this.categoriesString.split(',').map(cat => cat.trim());

    this.boutiqueService.updateBoutique(this.boutiqueId, this.boutique).subscribe({
      next: (updatedBoutique) => {
        alert('Boutique mise à jour avec succès !');
        this.boutique = updatedBoutique;

        // Redirection vers le composant affichant la liste ou le détail précédent
        // Remplace 'liste-boutiques' par le path réel de ton composant
        this.router.navigate(['/liste-boutiques']);
      },
      error: (err) => {
        alert(err.error?.message || 'Erreur lors de la mise à jour');
      }
    });
  }
}