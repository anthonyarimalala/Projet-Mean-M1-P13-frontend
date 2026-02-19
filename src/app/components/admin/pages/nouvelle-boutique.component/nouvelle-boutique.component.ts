import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nouvelle-boutique',
  imports: [ReactiveFormsModule],
  templateUrl: './nouvelle-boutique.component.html',
  styleUrls: [
    './nouvelle-boutique.component.css',
    '../../../templates/pages/admin-boutique-inputs.component/admin-boutique-inputs.component.css',
  ],
})
export class NouvelleBoutiqueComponent {
  createForm: FormGroup;
  selectedCategories: string[] = [];

  constructor(private fb: FormBuilder, private router: Router) {
    this.createForm = this.fb.group({
      numero: ['', Validators.required],
      etage: [1, [Validators.required, Validators.min(0)]],
      is_disponible: [true],
      prix: [8900000, [Validators.min(0)]],
      promotionActive: [true],
      promotionTaux: [10, [Validators.min(0), Validators.max(100)]],
      nom_boutique: ['Tech World'],
      lien_site_web: ['https://tech-world.com', Validators.pattern('https?://.+')],
      locataire_id: ['USR_045'],
      date_prochain_paiement: ['2026-03-01T00:00'],
    });
  }

  ngOnInit(): void {
    // Initialiser les catégories par défaut
    this.selectedCategories = ['CAT_01', 'CAT_03'];
  }

  // Fonction create vide comme demandé
  create(data: any): void {
    // Cette fonction est intentionnellement vide
    console.log('Données à créer:', data);
  }

  onSubmit(): void {
    if (this.createForm.valid) {
      const formData = this.createForm.value;

      // Construire l'objet selon le format demandé
      const boutiqueData = {
        numero: formData.numero,
        etage: formData.etage,
        is_disponible: formData.is_disponible,
        prix: formData.prix,
        promotion: {
          active: formData.promotionActive,
          taux: formData.promotionTaux,
        },
        nom_boutique: formData.nom_boutique,
        lien_site_web: formData.lien_site_web,
        locataire_id: formData.locataire_id,
        date_prochain_paiement: {
          $date: new Date(formData.date_prochain_paiement).toISOString(),
        },
        categories: this.selectedCategories,
      };

      // Appeler la fonction create vide
      this.create(boutiqueData);

      // Afficher les données dans la console pour vérification
      console.log('Données formatées:', JSON.stringify(boutiqueData, null, 2));
    } else {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      Object.keys(this.createForm.controls).forEach((key) => {
        this.createForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/']); // ou la route de votre choix
  }

  toggleCategory(categoryId: string): void {
    const index = this.selectedCategories.indexOf(categoryId);
    if (index === -1) {
      this.selectedCategories.push(categoryId);
    } else {
      this.selectedCategories.splice(index, 1);
    }
  }

  isCategorySelected(categoryId: string): boolean {
    return this.selectedCategories.includes(categoryId);
  }
}
